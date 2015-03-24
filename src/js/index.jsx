const React = require('react');
const App = require('./components/App.jsx');
const Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link, NotFoundRoute } = Router;
const Home = require('./components/new/Home.jsx');
const NotFound = require('./components/PageNotFound.jsx');
const Wallet = require('./components/new/NewWallet.jsx');
const OldWallet = require('./components/Wallet.jsx');

var routes = [
  <Route handler={Home}>
    <Route name="wallet" path='/wallet' handler={Wallet} />
    <Route name="oldwallet" path='/oldwallet' handler={OldWallet} />
    <NotFoundRoute handler={NotFound}/>
    <DefaultRoute handler={Wallet} />
  </Route>
];

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});

// <DefaultRoute handler={Wallet} /> //Loads wallet at routehandler location
//React.render(<App />, document.getElementById('main'));
