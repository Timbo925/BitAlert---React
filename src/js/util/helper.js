var Wallet = require('./../model/wallet');
var Acounting = require('accounting');

function generateUUID(){
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function indexOfObjectArray(array, search, prop) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][prop] === search) return i;
  }
  return -1;
}

function getBalanceFormatted(number) {
  return Accounting.formatMoney(address.getBalanceSat()  , { symbol: "bits",  format: "%v %s" })
}

module.exports.getBAlanceFormatted = getBalanceFormatted;
module.exports.indexOfObjectArray = indexOfObjectArray;
module.exports.generateUUID = generateUUID;
