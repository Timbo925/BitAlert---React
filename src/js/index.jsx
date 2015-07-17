var React = require('react');
var Router = require('react-router');
var {RouteHandler, Route, DefaultRoute, NotFoundRoute} = Router;
var NotFound = require('./components/PageNotFound.jsx');
var Wallet = require('./components/md/Wallet.jsx');
var App = require('./components/md/App.jsx');
var HomePage = require('./components/md/HomePage.jsx');
var WalletAccount = require('./components/md/WalletAccount.jsx');
var WalletHome = require('./components/md/WalletHome.jsx');
var WalletSettings = require('./components/md/WalletSettings.jsx');

var routes = (
  <Route path='' handler={App}>
    <DefaultRoute name="home" handler={HomePage}/>
    <Route name="wallet" path="wallet" handler={Wallet}>
      <Route name='walletHome' path='home' handler={WalletHome} />
      <Route name="walletAccount" path="account/:accountIndex" handler={WalletAccount} />
      <Route name='walletSettings' path='settings' handler={WalletSettings} />
    </Route>

    <NotFoundRoute handler={NotFound}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
