var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addSource: function(typeSource, key, label) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_SOURCE,
      typeSource: typeSource,
      key: key,
      label: label
    });
  },

  clearList: function() {
    console.warn('clearList action not yet implemented...');
  },

  completeTask: function(task) {
    console.warn('completeTask action not yet implemented...');
  },

  updateBalance: function(sourceId) {
    AppDispatcher.handleServerAction({
      type: Constants.ActionSources.UPDATE_SOURCE,
      sourceId: sourceId
    })
  }

};
