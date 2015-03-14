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
    console.log('TODO Source to update: ' + JSON.stringify(source) + ' typeof: ' + typeof source)
    AppDispatcher.handleServerAction({
      type: Constants.ActionTypes.UPDATE_SOURCE_PENDING,
      source: source
    });

    source.update(function(err) {
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.UPDATE_SOURCE
      })
    });
    //setTimeout(function () {
    //  AppDispatcher.handleViewAction({
    //    type: Constants.ActionTypes.UPDATE_SOURCE,
    //    source: source
    //  })
    //}, 2000)
  }
}

