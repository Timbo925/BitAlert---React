const Dispatcher = require('flux').Dispatcher;
const Constants = require('../constants/AppConstants');
const assign = require('object-assign');

let AppDispatcher = assign(new Dispatcher(), {

  handleServerAction(action) {
    let payload = {
      source: Constants.ActionSources.SERVER_ACTION,
      action: action
    };
    console.log('Dispatching Server: ', payload.action.type, payload);
    this.dispatch(payload);
  },

  handleViewAction(action) {
    let payload = {
      source: Constants.ActionSources.VIEW_ACTION,
      action: action
    };
    console.log('Dispatching Action: ' , payload.action.type ,payload);
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
