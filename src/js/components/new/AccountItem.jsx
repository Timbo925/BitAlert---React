const React = require('react');
const boot = require('react-bootstrap');
const Panel = boot.Panel;
const ListGroupItem = boot.ListGroupItem;
const PubSub = require('pubsub-js');

let AccountItem = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  onClick(e) {
    PubSub.publish('Account Selected', this.props.index);
  },

  render() {
    return (
      <ListGroupItem bsStyle={this.props.index == this.props.selected ? 'info' : "default"} onClick={this.onClick} header={this.props.account.label}>{this.props.account.getBalanceSat()}</ListGroupItem>
    );
  }
});

module.exports = AccountItem;
