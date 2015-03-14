const Tx = require('./tx');

function Address(data) {
  data = data || {};
  this.address  = data.address || '';
  this.balanceSat = data.balanceSat || 0;
  this.txList = []; //List of all TX regarding the source
  if (data.txList) {
    for(var i = 0; i < data.txList.length; i++) this.txList.push(new Tx(data.txList[i]));
  }
}

module.exports = Address;
