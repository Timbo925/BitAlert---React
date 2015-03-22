const Tx = require('./tx');
const helper = require('../util/helper');

function Address(data) {
  data = data || {};
  this.id = data.id || helper.generateUUID();
  this.address  = data.address || '';
  this.balanceSat = data.balanceSat || 0;
  this.nb_txs = data.nb_txs || -1; // Will be set to 0 when address info is updated trough API
  this.txList = []; //List of all TX regarding the source
  if (data.txList) {
    for(var i = 0; i < data.txList.length; i++) this.txList.push(new Tx(data.txList[i]));
  }
}

Address.prototype.getBalanceSat = function() {
  return this.balanceSat;
};

module.exports = Address;
