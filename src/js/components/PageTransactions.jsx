const React = require('react');
const NavigationPils = require('./NavigationPils.jsx');

let PageTransactions = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    return (
      <div className = "container">
        <NavigationPils active={2}/>
      </div>
    );
  }
});

module.exports = PageTransactions;
