const React = require('react');
const boot = require('react-bootstrap/lib');
const Panel = boot.Panel;
const Col = boot.Col;
const ButtonToolbar = boot.ButtonToolbar;
const Nav = boot.Nav;
const Row = boot.Row;
const NavItem = boot.NavItem;
const Account = require('./Account.jsx');
const AccountAccordion = require('./AccountAccordion.jsx');
const walletActions = require('../actions/WalletActions');
const SourceInput = require('./SourceInput.jsx');
const WalletStore = require('../stores/WalletStore');
const NavigationPils = require('./NavigationPils.jsx');


let Wallet = React.createClass({
  getInitialState() {
    var wallet = WalletStore.loadWallet();
    return {wallet: wallet}; //App launches by loading wallet from user};
  },

  componentDidMount() {
    WalletStore.addChangeListener(this._onChange);
  },

  onClick(e) {
    console.log('Clicked TR');
    console.log(e.target)
  },

  _onChange() {
    //When something changed get new event
    this.setState(WalletStore.getAll)
  },

  saveWallet(e) {
    walletActions.saveWallet();
  },

  logWallet() {
    console.log('Wallet' , this.state.wallet);
  },

  componentWillUnmount() {
  },

  handleSelect (selectedKey) {
    alert('selected ' + selectedKey);
  },

  render() {
    var wallet = this.state.wallet;
    return (
      <div className = "container">
        <Row>
        <NavigationPils active={1} balance={wallet.getBalanceSat()}/>

            <boot.PageHeader>
                BitAlert Wallet <small> {wallet.getBalanceSat()/100} <small> bits</small> </small>
            </boot.PageHeader>
            <Row>
              <Col sm={6}>
                  <p> Wallet ID: {wallet.id}</p>
                  <p> User Name: {wallet.userName}</p>
              </Col>
              <Col sm={6}>
                <ButtonToolbar className="pull-right">
                  <boot.Button onClick={this.saveWallet} bsStyle="success">Save Wallet</boot.Button>
                  <boot.Button onClick={this.logWallet} bsStyle="warning">Log Wallet</boot.Button>
                </ButtonToolbar>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <AccountAccordion data={wallet.accountList}/>
              </Col>
              <Col sm={12} md={6}>
                <Panel header="Information Creation">
                  <SourceInput data={wallet.accountList}/>
                </Panel>
              </Col>
            </Row>
        </Row>
      </div>
    );
  }
});

module.exports = Wallet;
