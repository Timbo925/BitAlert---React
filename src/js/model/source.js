var helper = require('./helper');
var Address = require('./address');
const Const = require('../constants/AppConstants');
const Tx = require('./tx');

//Interface
function Source(data) {
  var data = data || {};
  this.id = data.id || helper.generateUUID();
  this.label = data.label || '';
  //this.balanceSat = data.balanceSat || 0;
  this.addressList = []; //For single only contains 1 address
  if (data.addressList) {
    for(var i = 0; i < data.addressList.length; i++) this.addressList.push(new Address(data.addressList[i]))
  }
  this.txList = []; //List of all TX regarding the source
  if (data.txList) {
    for(var i = 0; i < data.txList.length; i++) this.txList.push(new Tx(data.txList[i]));
  }
}

Source.prototype.updateBalance = function() {
  console.log("WARNING: Using base object Source which is an interface")
};

Source.prototype.getBalanceSat = function() {
  var balanceSat = 0;
  for(var i = 0; i< this.addressList.length; i++) balanceSat += this.addressList[i].balanceSat;
  return balanceSat;
};

function SingleSource(data) {
  var data = data || {};
  Source.call(this,data);
  this.sourceType = Const.SourceTypes.Single;
}

SingleSource.prototype = Object.create(Source.prototype);
SingleSource.prototype.constructor = SingleSource; //Set constructor to SingleSource

SingleSource.prototype.updateBalance = function() {
  console.log("TODO update single source")
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

exports.Source = Source;
exports.SingleSource = SingleSource;
exports.XpubSource = XpubSource;