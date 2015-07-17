var React = require('react');
var WalletStore = require('../../stores/WalletStore'); //Manages the wallet
var {DropDownMenu,FloatingActionButton, Paper,Table,Tabs, Avatar,Tab, List, ListDivider, ListItem, IconButton, CardAction, Card,CardText,CardHeader, Toolbar, ToolbarGroup, RaisedButton, FontIcon} = require('material-ui');
var RouteHandler = require('react-router').RouteHandler;

let WalletMD = React.createClass({
  getInitialState() {
    var wallet = WalletStore.loadWallet();

    var rowData = [
      {id: {content: 0}, name: {content: 'MyCelium'}, amount: {content: 2345}},
      {id: {content: 1}, name: {content: 'Sepending'}, amount: {content: 7654}},
      {id: {content: 2}, name: {content: 'Other'}, amount: {content: 0}}
    ];

    var headerColumns =
      { id: {content:'ID'},
        name: {content:'Name'},
        amount: {content: 'Amount'}
      };

    return {
      wallet: wallet,
      rowData: rowData,
      headerColumns: headerColumns,
      walletLoaded: true
    }
  },

  componentDidMount() {
    //When store updates fire onStore Change
    WalletStore.addChangeListener(this.onStoreChange);
  },

  onStoreChange() {
    //When something changed get new event
    this.setState(WalletStore.getAll)
  },

  saveWallet(e) {
    walletActions.saveWallet();
  },

  logWallet() {
    console.log('Wallet' , this.state.wallet);
  },

  render() {
    var test;
    if (this.state.walletLoaded) {
      test = <RouteHandler myprop='Wallet Loaded Passing Prop' wallet={this.state.wallet}/>
    } else {
      test = <p> Wallet not loaded, redirect to loading page</p>
    }
    return (
      <div>
        {test}
      </div>
    );
  }
});

module.exports = WalletMD;
