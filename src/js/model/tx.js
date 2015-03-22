
function Tx(data) {
  var data = data || {};
  this.tx = data.tx || '';
  this.label = data.label || '';
  this.amount = Math.round(data.amount) || 0;
  this.time_utc = data.time_utc || '2010-01-01T00:00:00Z'
}

module.exports = Tx;

