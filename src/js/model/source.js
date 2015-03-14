var helper = require('./../util/helper');
var Address = require('./address');
const Const = require('../constants/AppConstants');
const Tx = require('./tx');
const Api = require('../util/api');

//Interface
function Source(data) {
  var data = data || {};
  this.initialized = data.initialized || false;
  this.id = data.id || helper.generateUUID();
  this.label = data.label || '';
  //this.balanceSat = data.balanceSat || 0;
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
    var address = source.addressList[0];
    var newAddress = aList[0];
    if (source.initialized == false) {
      source.initialized = true;  //Set Updated to true
      source.addressList = aList; //Address can be changed to returned array from API
    } else {
      if (address.getBalanceSat() != newAddress.getBalanceSat()) {
        //When different something must have changed in id tx
        for (tx of newAddress.txList) {
          var index = helper.indexOfObjectArray(address.txList, tx.tx, 'tx');
          if (index < 0) address.txList.push(tx); // No else because
        }
      }
    }
    callback(null);
  });
};

function XpubSource(data) {
  var data = data || {};
  Source.call(this,data);
  this.sourceType = Const.SourceTypes.Xpub;
  this.xpub = data.xpub || '';
  this.inDepth = data.inDepth || 0;
  this.exDepth = data.exDepth || 0;
}

XpubSource.prototype = Object.create(Source.prototype);
XpubSource.prototype.constructor = XpubSource;

//TODO XpubSource.update
XpubSource.prototype.update = function(callback) {

};
exports.Source = Source;
exports.SingleSource = SingleSource;
exports.XpubSource = XpubSource;
