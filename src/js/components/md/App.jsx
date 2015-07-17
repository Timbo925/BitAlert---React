console.log(global);
var React = require('react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var {DropDownMenu, AppBar, LeftNav, IconButton, MenuItem, IconMenu} = mui;
var injectTapEventPlugin = require("react-tap-event-plugin");
var PubSub = require('pubsub-js');
var Constants = require('../../constants/AppConstants');


var Home = React.createClass({
  mixins: [Navigation, Router.State],

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  toggleNav(e) {
    this.refs.navigation.toggle();
  },

  componentWillMount() {
    injectTapEventPlugin();
  },

  clickedNavigation(e, selectedIndex, menuItem) {
    var route = menuItem.payload;
    if(menuItem.text =='Account') {
      route += "/" + this.refs.accountSelection.state.selectedIndex;
    }
    this.transitionTo(route);
  },

  componentDidMount() {
    if (this.getParams() != 'undefined' && this.getParams().accountIndex != 'undefined') {
      console.log("Setting new stateindex")
      this.setState({selectedIndex: parseInt(this.getParams().accountIndex)});
    }
  },gu

  getInitialState() {
    return {
      walletLoaded: true,
      selectedIndex: 0,
      menuItems: [{payload: '1', text: 'Account 1'}, {payload: '2', text: 'Account 2'}],
      navItems: [
        {text: 'Home', payload: 'home'},
        {text: 'About', payload: 'about'},
        {text: 'Support', payload: 'support'},
        {type: mui.MenuItem.Types.SUBHEADER, text: 'Watch Wallet'},
        {text: 'Wallet', payload: '/wallet'},
        {text: 'Account', payload: '/wallet/account'},
        {text: 'Settings', payload: '/settings'}
      ]
    };
  },

  render() {
    return (
    <div>
      <AppBar
        title="Wallet Watcher"
        iconElementLeft={
          <IconButton
            iconClassName="material-icons"
            onClick={this.toggleNav}>
            menu
          </IconButton>}
        iconElementRight={
          <DropDownMenu
            ref='accountSelection'
            selectedIndex = {this.state.selectedIndex}
            style={{color: 'rgba(255, 255, 255, 0.87)'}}
            menuItems={this.state.menuItems} />
        }
        />
      <LeftNav
        ref="navigation"
        menuItems={this.state.navItems}
        docked={false}
        onChange={this.clickedNavigation}
        >
      </LeftNav>
      <div>
          <RouteHandler/>
      </div>
      </div>
    )
  }
});

module.exports = Home;
