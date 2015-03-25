const React = require('react');
const boot = require('react-bootstrap');
const {Col, Row, Button, PageHeader, TabbedArea,TabPane,Panel,ListGroup,ListGroupItem, ModalTrigger} = boot;
const WalletStore = require('../../stores/WalletStore');
const AccountItem = require('./AccountItem.jsx');
const Account = require('../Account.jsx');
const AccountEdit = require('../AccountEditForm.jsx');
const PubSub = require('pubsub-js');
const AddModal = require('../AddModal.jsx');


let NewWallet = React.createClass({
  getInitialState() {
    return {
      wallet: WalletStore.loadWallet(),
      selected: 0};
  },

  componentDidMount() {
    var comp = this;
    WalletStore.addChangeListener(this._onChange);
    var subscription = PubSub.subscribe('Account Selected', function(msg, data) {
      comp.setState({selected: data});
    })
  },

  _onChange() {
    this.setState({wallet: WalletStore.getWallet()})
  },

  add() {
    console.log('TODO add')
  },


  render() {
    var wal = this;
    return (
        <Row>
          <PageHeader> Timbo's BitAlert Wallet <small>{this.state.wallet.getBalanceSat()/100} bits</small></PageHeader>
          <Col md={3}>
            <ListGroup>
              {this.state.wallet.accountList.map(function(account, i) {
                return <AccountItem account={account} index ={i} key={i} selected={wal.state.selected}/>
              })}
              <ModalTrigger modal={<AddModal accountList={this.state.wallet.accountList}/>} >
                <ListGroupItem bsStyle='danger'> Add Account/Source </ListGroupItem>
              </ModalTrigger>

            </ListGroup>
          </Col>

          <Col md={9}>
            <Panel>
            <TabbedArea defaultActiveKey={0}>
              <TabPane eventKey={0} tab="Account"><AccountEdit  account={this.state.wallet.accountList[this.state.selected]}/></TabPane>
              <TabPane eventKey={1} tab="Sources"><Account data={this.state.wallet.accountList[this.state.selected]}/></TabPane>
              <TabPane eventKey={2} tab="Transactions">Txs</TabPane>
            </TabbedArea>
              </Panel>
          </Col>
        </Row>
    );
  }
});

module.exports = NewWallet;
