const React = require('react');
const boot = require('react-bootstrap/lib');
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
          <boot.Col sm={12}>
            <boot.PageHeader>
                BitAlert Wallet
            </boot.PageHeader>

            <boot.Col sm={8}>
                <p> Wallet ID: {wallet.id}</p>
                <p> User Name: {wallet.userName}</p>
            </boot.Col>
              <boot.Button onClick={this.saveWallet} bsStyle="success">Save Wallet</boot.Button>
            <boot.Col sm={4}>

            </boot.Col>

            <boot.Col sm={12}>
              <AccountAccordion data={wallet.accountList}/>
              <boot.Panel>
                <SourceInput data={wallet.accountList}/>
              </boot.Panel>
            </boot.Col>
          </boot.Col>
        </boot.Row>
      </div>
    );
  }
});

module.exports = Wallet;
