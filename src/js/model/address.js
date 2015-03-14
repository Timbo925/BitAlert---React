function Address(data) {
  data = data || {};
  this.address  = data.address || '';
  this.balanceSat = data.balanceSat || 0;
}

module.exports = Address;
