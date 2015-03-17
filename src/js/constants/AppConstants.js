const keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    ADD_SOURCE: null,
    ADD_ACCOUNT: null,
    UPDATE_SOURCE: null,
    UPDATE_SOURCE_PENDING: null,
    REMOVE_SOURCE: null,
    SAVE_WALLET: null,
    EDIT_SOURCE: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  SourceTypes: keyMirror({
    Single: null,
    Xpub: null,
    GreenAddress: null
  })

};
