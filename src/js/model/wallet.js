var Account = require('./account');
var helper = require('./../util/helper');

function Wallet(data){
  var data = data || {};
  this.id = data.id || helper.generateUUID();
  this.userName = data.userName || 'Guest';
  this.accountList = [];
  if (data.accountList) {
    for (var i = 0; i<data.accountList.length; i ++) {
      if (!data.accountList[i].label || data.accountList[i].label == 'Account') {
        data.accountList[i].label = 'Account #' + (this.accountList.length+1);      //Set a label based on index in accountList if non existent or standard label
      }
      this.accountList.push(new Account(data.accountList[i]));
    }
  }
}

Wallet.prototype.getUserName = function ( ) {
  return this.userName;
};

Wallet.prototype.changeAccount = function(id, key, value) {
  for (var i = 0; i<this.accountList.length; i++) {
    if (this.accountList[i].id == id) this.accountList[i].set(key, value);
  }
};


Wallet.prototype.getAccountById = function(id) {
  for (var i = 0; i<this.accountList.length; i++) {
    if (this.accountList[i].id == id) return this.accountList[i];
  }
  return null;
};

Wallet.prototype.addAccountData = function(data) {
  this.accountList.push(new Account(data));
};

function saveWallet(wallet) {
  // TODO implement saving ot local storage, encrypted
  console.log('Saving to LocalStorage');
  localStorage.setItem('BitAlertWallet', JSON.stringify(wallet));
}

function loadWallet(passwordHash) { //Loads wallet from localstorage or creates new wallet
  //TODO local saving using the passwordhash forn encyption
  var retrievedObject = localStorage.getItem('BitAlertWallet');
  var newWallet;
  if (!retrievedObject) newWallet = new Wallet();
  else newWallet = new Wallet(JSON.parse(retrievedObject));
  console.log('Wallet Loaded: ', newWallet);
  return newWallet;
}

module.exports.Wallet = Wallet;
module.exports.loadWallet = loadWallet;
module.exports.saveWallet = saveWallet;

