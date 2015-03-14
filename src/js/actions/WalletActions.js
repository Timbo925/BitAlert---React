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
  }

};
