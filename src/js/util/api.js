var request = require('superagent');
var Address = require('../model/address');
var Tx = require('../model/tx');

var exp = {

  getAddresses : function(addressList, callback) {
    var list = [];
    if (addressList.length == 0 ) callback (null);
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
            list.push(new Address({
              address: data[i].address,
              balanceSat: data[i].balance*1e8 + data[i].balance_multisig,
              txList: [],
              nb_txs: 0 //TODO SET TO 0
            }))
          }
          getTx(addressList, list, function(err, res) {
            if (err) {return callback(err)}
            else {
              return callback(null,res);
            }
          })
        }
      })
  },

  /**
   * Update a list of containing a list of array.
   * @param list -- Array of Address
   * @param callback -- callback(Error)
   */
  updateAddressList : function(list , callback) {
    request
      .get('http://btc.blockr.io/api/v1/address/info/' + listToCommaString(list))
      .accept('json')
      .query({confirmations: 0})
      .end(function(err, res) {
        if (err) return callback(err);
        else if (res.ok) {
          var updateList = [];
          var data = list.length == 1 ? [res.body.data] : res.body.data;
          for(var i = 0; i < list.length; i++) {
            if (list[i].nb_txs < 0 || list[i].nb_txs != data[i].nb_txs) { // <0: first time testing source, !=: new information about address
              list[i].balanceSat = Math.round(data[i].balance*1e8 + data[i].balance_multisig*1e8);
              list[i].nb_txs = data[i].nb_txs;
              updateList.push(list[i]);                   //Add this to list [Address] to be updated for txs
            }
          }
          if (updateList.length == 0) {
            console.log('Nothing to update'); //TODO CONSOLE LOG
            callback(null)
          } else {
            this.updateTxAddressList(updateList, function(err) {
              if (err) return callback(err);
              else return callback(null);
            })
          }
        } else {
          return callback(new Error('Something wrong with API Call', res))
        }
      })
  },

  /**
   * Update the tx list of list of Addresses
   * @param list -- [Address] to be updated for TX list
   * @param callback -- callback(Error)
   */
  updateTxAddressList: function(list , callback) {
    request
      .get('http://btc.blockr.io/api/v1/address/txs/' + addressToString(addressList))
      .accept('json')
      .end(function(err, res) {
        if (err) return callback(err);
        else if (!res.ok) return callback(new Error('updateTXAddressList problem', res));
        else {
          var data = list.length == 1 ? [res.body.data]: res.body.data;
          for (var i = 0; i < list.length; i++) {
            for(var j = 0; j < data[i].txs.length; j++) {
              if (!arrayContainsProp(list[i].txList, "tx", data[i].txs[j].tx)) {  //Wont update tx already in address.txList
                list[i].txList.push(new Tx({
                  tx: data[i].txs[j].tx,
                  time_utc: data[i].txs[j].time_utc,
                  amount: Math.round(data[i].txs[j].amount*1e8 + data[i].txs[j].amount_multisig*1e8)
                }))
              }
            }
          }
          callback(null);
        }
      })
  }
};

function getTx(addressList, list, callback) {
  if(addressList.length == 0) {return callback(new Error("No addresses given to getTx"))}
else {
    request
      .get('http://btc.blockr.io/api/v1/address/txs/' + addressToString(addressList))
      .accept('json')
      .end(function(err, res) {
        if (err) {return callback(err)}
        else if (res.ok) {
          console.log('API GET TX: ' , res);
          console.log('List: ', list);
          var res = res.body;
          if(addressList.length == 1) {
            res.data = [res.data];
          }
          for(var i = 0; i<list.length; i++) {
            if(list[i].address == res.data[i].address &&  list[i].nb_txs !== res.data[i].nb_txs) {
              list[i].nb_txs = res.data[i].nb_txs;
              console.log('Checking TXs: ' , res.data[i]);
              for(var j = 0; j < res.data[i].txs.length; j++) {
                if (!arrayContainsProp(list[i].txList, "tx", res.data[i].txs[j].tx)) {
                  list[i].txList.push(new Tx({
                    tx: res.data[i].txs[j].tx,
                    time_utc: res.data[i].txs[j].time_utc,
                    amount: res.data[i].txs[j].amount*1e8 + res.data[i].txs[j].amount_multisig*1e8
                  }))
                }
              }
            }
          }
          callback(null, list)
        }
        else {
          return callback(new Error("Something when wrong in getTx",res))
        }
      })
  }
}

function addressToString(list) {
  var str = '';
  for (var i=0;i<list.length; i++) {
    str += list[i];
    if (i != list.length - 1)  str += ','
  }
  return str;
}

function listToCommaString(list) {
  var str = '';
  for (var i = 0; i < list.length; i ++) {
    str += list[i].address;
    if (i != list.length -1) {str += ','}
  }
  return str;
}

function arrayContainsProp(array, prop, value) {
  for (var i = 0; i < array.length ; i++) {
    if (array[i][prop] == value) {
      return true
    }
  }
  return false;
}

module.exports = exp;

//exp.getAddresses(['198aMn6ZYAczwrE5NvNTUMyJ5qkfy4g3Hi'], function(err, list) {
//  console.log(list);
//});
