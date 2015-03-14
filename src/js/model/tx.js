
function Tx(data) {
  var data = data || {};
  this.tx = data.tx || '';
  this.label = data.label || '';
  this.time_utc = data.utc || '2010-01-01T00:00:00Z'
}

module.exports = Tx;
