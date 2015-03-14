var helper = require('./helper');
var Source = require('./source');

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

//Constructor for SourceList based on Json data
var returnSourceList = function (data) {
  var list = [];
  for (var i = 0; i<data.length; i++) {
    switch (data[i].sourceType) {
      case 'single':
        list.push(new Source.SingleSource(data[i]));
        break;
      case 'xpub':
        list.push(new Source.XpubSource(data[i]));
        break;
      default:
        list.push(new Source.Source(data[i]));
        break;
    }
  }
  return list;
};

module.exports = Account;
