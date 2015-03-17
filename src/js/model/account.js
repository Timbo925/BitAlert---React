var helper = require('./../util/helper');
var Source = require('./source');
const constants = require('../constants/AppConstants');

function Account(data) {
  var data = data || {};
  this.id = data.id || helper.generateUUID();
  this.sourceList = [];
  this.label = data.label || 'Account';
  if (data.sourceList) {                                   //Restore sourcelist using correct obejct based on type
    this.sourceList = returnSourceList(data.sourceList);
  }
}

Account.prototype.getBalanceSat = function() {
  var balanceSat = 0;
  for (var i = 0; i<this.sourceList.length; i++) {
    balanceSat += this.sourceList[i].getBalanceSat();
  }
  return balanceSat;
};

Account.prototype.set = function(key,value) {
  this[key] = value;
};

Account.prototype.get = function(key) {
  return this[key];
};

Account.prototype.addSource = function (source) {
  this.sourceList = this.sourceList.concat(source);
};

/**
 *
 * @param data: {sourType: required, xpub: required, label, optional}
 */
Account.prototype.addSourceData = function (data) {
  switch (data.sourceType) {
    case constants.SourceTypes.Single:
          var newdata = {
            label : data.label,
            addressList : [{address: data.address}]
          };
          this.addSource(new Source.SingleSource(newdata));
          break;
    case constants.SourceTypes.Xpub:
          this.addSource(new Source.XpubSource(data));
          break;
    default:
          this.addSource(data)
  }
};


//Constructor for SourceList based on Json data
var returnSourceList = function (data) {
  var list = [];
  for (var i = 0; i<data.length; i++) {
    //console.log(data[i]);
    switch (data[i].sourceType) {
      case constants.SourceTypes.Single:
        list.push(new Source.SingleSource(data[i]));
        break;
      case constants.SourceTypes.Xpub:
        list.push(new Source.XpubSource(data[i]));
        break;
      default:
        console.log(new Error('No sourceType found'))
        //list.push(new Source.Source(data[i]));
        break;
    }
  }
  return list;
};

module.exports = Account;
