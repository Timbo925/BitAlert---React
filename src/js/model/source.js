const helper = require('./../util/helper');
var Address = require('./address');
const Const = require('../constants/AppConstants');
var Tx = require('./tx');
const Api = require('../util/api');
const bitcore = require('bitcore');
const async = require('async');

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

//SingleSource.prototype.update = function(callback) {
//  var source = this;
//  Api.getAddresses([source.addressList[0].address],function(err, aList) {
//    if (err && !aList[0]) return callback(new Error('Something went wrong retrieving balances'));
//    var address = source.addressList[0];
//    var newAddress = aList[0];
//    if (source.initialized == false) {
//      source.initialized = true;  //Set Updated to true
//      source.addressList = aList; //Address can be changed to returned array from API
//    } else {
//      if (address.getBalanceSat() != newAddress.getBalanceSat()) {
//        //When different something must have changed in id tx
//        for (let tx of newAddress.txList) {
//          var index = helper.indexOfObjectArray(address.txList, tx.tx, 'tx');
//          if (index < 0) address.txList.push(tx); // No else because
//        }
//      }
//    }
//    callback(null);
//  });
//};

SingleSource.prototype.update = function(callback) {
  var source = this;
  Api.updateAddressList(this.addressList, function(err) {
    if (err) {return callback(err)}
    else {
      console.log('Updated Source', source.addressList);
      callback(null)
    }
  })
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

  //Add first addresses if needed for nex xpub source
  var source = this;
  if (this.initialized == false) {
    this.addressList = this.addNextAddresses(this.addressList);
    this.changeAddressList = this.addNextAddresses(this.changeAddressList);
    source.initialized = true;
  }
}

XpubSource.prototype = Object.create(Source.prototype);
XpubSource.prototype.constructor = XpubSource;

/**
 * Update both types of sources
 * @param callback
 */

XpubSource.prototype.update = function(callback) {
  var source = this;
  async.each([source.addressList, source.changeAddressList], function(list, callback) {
    Api.updateAddressList(list, function(err) {
      if (err) return callback(err);
      else {
        console.log('Updated Xpub Source: ', source.addressList);
        callback(null)
      }
    })
  }, function(err) {
    if (err) callback(err);
    else {
      source.testAddUpdate(function(err) {
        callback(err);
      })
    }
  })
};

XpubSource.prototype.testAddUpdate = function(callback) {
  var source = this;
  async.each([source.addressList, source.changeAddressList], function(list, callback) {
    //console.log('Each Source:' , list);
    source.testAddUpdateList(list,function(err) {
      if (err) callback(err);
      else callback(null);
    })
  }, function(err) {
    if (err) callback(err);
    else callback(null);
  })
};

XpubSource.prototype.testAddUpdateList = function(list, callback) {
  var xpub = this;
  async.whilst(
    function(){
      return !isFull(list)},                   // Check if list is full and needs new addresses
    function(callback) {
      console.log('Xpub Full', list);
      list = xpub.getAddresses(list);                   // Add addresses to the list
      xpub.updateAddressList(list, function(err) {      // Update the new list
        if (err) callback(err);
        else callback(null);
      })
    },
    function(err) {
      if (err) callback(err);
      else callback(null);
    }
  )
};

XpubSource.prototype.addNextAddresses = function (list) {
  var xpub = this;
  var depth = list === xpub.addressList ? 'inDepth': 'exDepth';
  var type = list === xpub.addressList ? 0 : 1;
  this[depth] += 9;                                                     //Set new depth
  var newList = this.getAddresses(type, this[depth] - 9, this[depth]);  //Take next 10 addresses
  console.log('New Addresses:', newList)
  return list = list.concat(newList);

};

XpubSource.prototype.getAddresses = function(type, from, to) {
  var xpubSource = this;
  var addressList = [];
  var hdPublicKey = new bitcore.HDPublicKey(xpubSource['xpub']);
  for(var i = from; i < to + 1; i ++) {
    var address = new bitcore.Address(hdPublicKey.derive(type).derive(i).publicKey);
    addressList.push(new Address({address: address.toString()}));
  }
  return addressList;
};

exports.Source = Source;
exports.SingleSource = SingleSource;
exports.XpubSource = XpubSource;


/**
 * Test if last address has any transactions
 * @param list
 * @returns {boolean}
 */
function isFull(list) {
  return list[list.length -1].nb_txs < 1
}

function getAddressesFromList(list) {
  var rlist = [];
  for (var i = 0; i < list.length; i ++) {
    rlist.push(list[i].address);
  }
  return rlist;
}

//var x = new XpubSource({xpub: 'xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8'});
//x.addNextAddresList(0,function(){});
