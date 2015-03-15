var React = require('react');
//Pages
var Wallet = require('./Wallet.jsx');
var PageTransactions = require('./PageTransactions.jsx');
var PageNotFound = require('./PageNotFound.jsx');
//Router
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

let App = React.createClass({

  getInitialState() {
    return {

    }
  },

  render() {
    return (
      <Locations>
        <Location path="/" handler={Wallet} />
        <Location path="/tx" handler={PageTransactions} />
        <NotFound handler={PageNotFound} />
      </Locations>
    );
  }

});


module.exports = App;
