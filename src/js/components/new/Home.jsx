const React = require('react');
const boot = require('react-bootstrap');
const Navbar = boot.Navbar;
const Nav = boot.Nav;
const NavItem = require('react-router-bootstrap').NavItemLink;
const WalletR = require('./NewWallet.jsx');
const Router = require('react-router');
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;
//var Link = require('react-router-component').Link
var padding = {
  padding : '55'
};

let NewWallet = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    return (
      <div className='container'>
        <Navbar brand="BitAlert" fixedTop fluid inverse>
          <Nav>
            <NavItem to='/'> Home </NavItem>
            <NavItem to="/oldwallet"> Old Wallet </NavItem>
          </Nav>
        </Navbar>

        <div id="RouteHanlderID"style={padding}>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = NewWallet;
