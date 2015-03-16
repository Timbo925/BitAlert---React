const React = require('react');
const boot = require('react-bootstrap/lib');
const Panel = boot.Panel;
const Col = boot.Col;
const Account = require('./Account.jsx');

const AccountAccordion = require('./AccountAccordion.jsx');
const walletActions = require('../actions/WalletActions');
const SourceInput = require('./SourceInput.jsx');
const WalletStore = require('../stores/WalletStore');
var Router = require('react-router-component');
var Link = Router.Link;


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

  componentWillUnmount() {
  },

  render() {
    var wallet = this.state.wallet;
    return (
      <div className = "container">
        <boot.Row>
          <Link glabal href= "/tx"> Tx  Up here</Link>
          <Col sm={12}>
            <boot.PageHeader>
                BitAlert Wallet
            </boot.PageHeader>

            <Col sm={8}>
                <p> Wallet ID: {wallet.id}</p>
                <p> User Name: {wallet.userName}</p>
            </Col>
              <boot.Button onClick={this.saveWallet} bsStyle="success">Save Wallet</boot.Button>
            <Col sm={4}>

            </Col>

            <Col sm={12}>
              <AccountAccordion data={wallet.accountList}/>
              <Panel header="Information Creation">
                <SourceInput data={wallet.accountList}/>
              </Panel>
            </Col>
          </Col>
        </boot.Row>
      </div>
    );
  }
});

module.exports = Wallet;
