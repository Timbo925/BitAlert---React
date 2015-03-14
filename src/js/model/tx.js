
function Tx(data) {
  var data = data || {};
  this.txHash = data.txHash || '';
  this.label = data.label || '';
}

module.exports = Tx;
