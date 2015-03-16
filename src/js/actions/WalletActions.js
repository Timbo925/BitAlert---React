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

  addNewAccount: function(data) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_ACCOUNT,
      data: data
    })
  },

  updateSource: function(source) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.UPDATE_SOURCE_PENDING,
      source: source
    });

    source.update(function(err) {
      //TODO notification when problem
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.UPDATE_SOURCE
      })
    });
  }
};

