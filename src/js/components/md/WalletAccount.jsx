const React = require('react');
var PubSub = require('pubsub-js');
var Constants = require('../../constants/AppConstants');

let Account = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {

  },

  render() {
    return (
      <p>Account Page {this.props.params}</p>
    );
  }
});

module.exports = Account;
