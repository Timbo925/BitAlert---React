const helper = require('./../util/helper');
var Address = require('./address');
const Const = require('../constants/AppConstants');
var Tx = require('./tx');
const Api = require('../util/api');
const bitcore = require('bitcore');

//Interface
function Source(data) {
  var data = data || {};
  this.initialized = data.initialized || false;
  this.id = data.id || helper.generateUUID();
  this.label = data.label || '';
  this.addressList = []; //For single only contains 1 address
  if (data.addressList) {
    for(var i = 0; i < data.addressList.length; i++) this.addressList.push(new Address(data.addressList[i]))
  }
}

Source.prototype.update = function() {
  console.log("WARNING: Using base object Source which is an interface")
};

Source.prototype.getBalanceSat = function() {
  var balanceSat = 0;
  for(var i = 0; i< this.addressList.length; i++) balanceSat += this.addressList[i].getBalanceSat();
  return balanceSat;
};

function SingleSource(data) {
  var data = data || {};
  Source.call(this,data);
  this.sourceType = Const.SourceTypes.Single;
}

SingleSource.prototype = Object.create(Source.prototype);
SingleSource.prototype.constructor = SingleSource; //Set constructor to SingleSource

SingleSource.prototype.update = function(callback) {
  var source = this;
  Api.getAddresses([source.addressList[0].address],function(err, aList) {
    if (!err && !aList[0]) return callback(new Error('Something went wrong retrieving balances'))
    var address = source.addressList[0];
    var newAddress = aList[0];
    if (source.initialized == false) {
      source.initialized = true;  //Set Updated to true
      source.addressList = aList; //Address can be changed to returned array from API
    } else {
      if (address.getBalanceSat() != newAddress.getBalanceSat()) {
        //When different something must have changed in id tx
        for (let tx of newAddress.txList) {
          var index = helper.indexOfObjectArray(address.txList, tx.tx, 'tx');
          if (index < 0) address.txList.push(tx); // No else because
        }
      }
    }
    callback(null);
  });
};


/**
 *
 * @param data:
 * @constructor {lable: x, xpub: x}
 */
function XpubSource(data) {
  var data = data || {};
  Source.call(this,data);
  this.sourceType = Const.SourceTypes.Xpub;
  this.xpub = data.xpub;
  this.inDepth = data.inDepth || 0;
  this.exDepth = data.exDepth || 0;
  this.changeAddressList = []; //For single only contains 1 address
  if (data.changeAddressList) {
    for(var i = 0; i < data.changeAddressList.length; i++) this.changeAddressList.push(new Address(data.changeAddressList[i]))
  }
}

XpubSource.prototype = Object.create(Source.prototype);
XpubSource.prototype.constructor = XpubSource;

XpubSource.prototype.update = function(callback) {
  var xpub = this;
  xpub.updateType(0, function(err) {
    if (err) callback(err);
    else xpub.updateType(1, function(err) {
      if (err) callback(err);
      else callback(null)
    })
  })
};

XpubSource.prototype.updateType = function (type, callback) {
  var list; var depth; var xpub = this;
  if (type == 0) { list = this.addressList}
  else { list = this.changeAddressList}
  updateList(list, function(err) {
    if(err) {console.log(err); callback(err)}
    //Check latest
    if(list.length == 0 || list[list.length - 1].nb_txs > 0) {
      xpub.addNextAddressList(type, function(err, nlist) {
        if (err) {callback(err)}
        else callback(null)
      })
    } else {
      callback(null)
    }
  })

};

/**
 *
 * @param type : 0 or 1
 * @param callback : function(list)
 */
XpubSource.prototype.addNextAddressList = function (type, callback) {
  var xpub = this;
  var listLoc;
  var depth;
  if (type == 0) { listLoc = "addressList";  depth = 'inDepth'}
  else {listLoc = "changeAddressList";  depth = 'exDepth'}
  this[depth] += 9;
  var searchList = this.getAddresses(type, this[depth] - 9, this[depth]);  //Take next 10 addresses
  Api.getAddresses(searchList, function(err, nlist)  {
    if(err) return callback(err);
    else {
      console.log('API Received List: ' , nlist);
      xpub[listLoc] = xpub[listLoc].concat(nlist);
      console.log('New List: ', xpub[listLoc]);
      callback(null);
    }
  })
};

XpubSource.prototype.getAddresses = function(type, from, to) {
  var xpubSource = this;
  var addressList = [];
  var hdPublicKey = new bitcore.HDPublicKey(xpubSource['xpub']);
  for(var i = from; i < to + 1; i ++) {
    var address = new bitcore.Address(hdPublicKey.derive(type).derive(i).publicKey);
    addressList.push(address.toString());
  }
  ///console.log('AddressList from Xpub: ' , addressList);
  return addressList;
};

exports.Source = Source;
exports.SingleSource = SingleSource;
exports.XpubSource = XpubSource;

function updateList(list, callback) {
  if(list.length == 0) return callback(null); //Nothing to update
  Api.getAddresses(getAddressesFromList(list), function(err, rlist) {
    if (err) return callback(err);
    else {
      for (var i = 0; i < rlist.length; i++) {
        if (rlist[0].address == list[0].address && rlist[0].nb_txs != list[0].nb_txs) {
          list[0].balanceSat = rlist[0].balanceSat;
          list[0].nb_txs = rlist[0].nb_txs;
          //TODO get and update tx list
        }
      }
      callback(null)
    }
  })
};

function getAddressesFromList(list) {
  var rlist = [];
  for (var i = 0; i < list.length; i ++) {
    rlist.push(list[i].address);
  }
  return rlist;
}
//
var x = new XpubSource({xpub: 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'});
//x.addNextAddresList(0,function(){});
