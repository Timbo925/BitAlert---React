var React = require('react');
//Pages
var Wallet = require('./Wallet.jsx');
var PageTransactions = require('./PageTransactions.jsx');
var PageNotFound = require('./PageNotFound.jsx');
var Home = require('./new/Home.jsx');
//Router
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

let App = React.createClass({
  render() {
    return (
        <Locations>
          <Location path="/" handler={Home} />
          <Location path="/tx" handler={PageTransactions} />
          <Location path='/new' handler={Wallet}/>
          <NotFound handler={PageNotFound} />
        </Locations>
    )
  }
});

module.exports = App;
