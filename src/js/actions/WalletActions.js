var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  saveWallet: function() {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.SAVE_WALLET
    });
  },

  addNewSource: function(data) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_SOURCE,
      data: data
    })
  },

  updateSource: function(source) {
    //TODO here calls to API or async tasks
    console.log('TODO Source to update: ' + JSON.stringify(source) + ' typeof: ' + typeof source)
  }


};
