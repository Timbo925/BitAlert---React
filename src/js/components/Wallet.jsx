const React = require('react');
const boot = require('react-bootstrap/lib');
const Account = require('./Account.jsx');
const AccountAccordion = require('./AccountAccordion.jsx');
const walletActions = require('../actions/WalletActions');
const SourceInput = require('./SourceInput.jsx');

let Wallet = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    console.log(this.props.wallet);
  },

  onClick(e) {
    console.log('Clicked TR');
    console.log(e.target)
  },

  saveWallet(e) {
    walletActions.saveWallet();
  },

  render() {
    var wallet = this.props.wallet;
    return (
      <boot.Row>
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
    );
  }
});

module.exports = Wallet;
