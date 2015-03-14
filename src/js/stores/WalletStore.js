const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
var WalletMain = require('../model/wallet');
var Wallet = WalletMain.Wallet;
var Account = require('../model/account');
var Source = require('../model/source');

// data storage
//var a = new Account;
//var a2 = new Account;
//var s = new Source.SingleSource({balanceSat: 10, label: 'Single Address', addressList: [{address: 'BitcoinAddress', balanceSat: 10}]});

let wallet = [];
//a.sourceList.push(s);
//wallet.accountList.push(a);
//wallet.accountList.push(a2);


function loadWallet() {
  return Wallet.loadWallet()
}

function saveWallet() {
  WalletMain.saveWallet(wallet);
}

function addNewSource(data) {
  console.log('TODO add to wallet: ' + JSON.stringify(data))
}

// Facebook style store creation.
let WalletStore = assign({}, BaseStore, {

  loadWallet() {
    return wallet = WalletMain.loadWallet();
  },
  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      wallet: wallet
    };
  },

  getWallet() {
    return wallet;
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.SAVE_WALLET:
            saveWallet();
            break;
      case Constants.ActionTypes.ADD_SOURCE:
            addNewSource(action.data);
            wallet.userName = "Timbo";
            WalletStore.emitChange();
            break;

    }
  })

});

module.exports = WalletStore;