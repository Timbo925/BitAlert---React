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
  console.log('New Wallet Loaded');
  console.log(newWallet);
  return newWallet;
}

module.exports.Wallet = Wallet;
module.exports.loadWallet = loadWallet;
module.exports.saveWallet = saveWallet;


//////////////////
////TEST CODE ////
//////////////////

//var Source = require('./source');
//var SingleSource = Source.SingleSource;
//var XpubSource = Source.XpubSource;
//
//var wallet = new Wallet({userName: 'Timbo925'});
//
//var a1 = new Account({balanceSat : 10});
//var a2 = new Account({balanceSat: 100});
//
//var ss1 = new SingleSource({label: 'SS01'});
//var ss2 = new SingleSource({label: 'SS02'});
//var xp1 = new XpubSource({label: 'Xpub01'});
//
//wallet.accountList.push(a1);
//wallet.accountList.push(a2);
//wallet.accountList[0].sourceList.push(ss1);
//wallet.accountList[0].sourceList.push(xp1);
//wallet.accountList[1].sourceList.push(ss2);
//
//wallet.accountList[0].set('test', 'Yo!!');
//
//console.log(JSON.stringify(wallet,null,3));


