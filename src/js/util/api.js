var request = require('superagent');
var Address = require('../model/address');

var exp = {

  getAddresses : function(addressList, callback) {
    var list = [];
    request
      .get('http://btc.blockr.io/api/v1/address/info/' + addressToString(addressList))
      .accept('json')
      .query({confirmations: 0})
      .end(function(err, res) {
        console.log('API GET Addresses: ' , res);
        if (res.ok) {
          if (addressList.length == 1) var data = [res.body.data];
          else var data = res.body.data;
          for (var i = 0; i < data.length; i++) {
            var tx = {};
            if (data[i].last_tx) {
              tx.tx  = data[i].last_tx.tx;
              tx.time_utc = data[i].last_tx.time_utc;
            }
            list.push(new Address({
              address: data[i].address,
              balanceSat: data[i].balance*1e8 + data[i].balance_multisig,
              txList: [tx]
            }))
          }
          return callback(null, list)
        }
      })

  }

};

function addressToString(list) {
  var array = ''
  for (var i=0;i<list.length; i++) {
    array += list[i]
    if (i != list.length - 1)  array += ','
  }
  return array;
}

module.exports = exp;

//exp.getAddresses(['198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi','1L8meqhMTRpxasdGt8DHSJfscxgHHzvPgk'], function(err, list) {
//  console.log(JSON.stringify(list, null, 2));
//});
