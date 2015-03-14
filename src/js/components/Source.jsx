const React = require('react');
const boot = require('react-bootstrap/lib');
const walletActions = require('../actions/WalletActions');

let Source = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {

  },

  updateSource() {
    walletActions.updateSource(this.props.data); //update given data
  },

  render() {
    var source = this.props.data;
    return (
      <tr>
        <td> {this.props.index} </td>
        <td> {source.sourceType} </td>
        <td> {source.label} </td>
        <td> {source.getBalanceSat()} </td>
        <td> <a onClick={this.updateSource}> Update </a> </td>
      </tr>
    )
  }
});

module.exports = Source;
