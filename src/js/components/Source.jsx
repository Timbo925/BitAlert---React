const React = require('react');

let Source = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {

  },

  render() {
    var source = this.props.data;
    return (
      <tr>
        <td> {this.props.index} </td>
        <td> {source.sourceType} </td>
        <td> {source.label} </td>
        <td> {source.getBalanceSat()} </td>
      </tr>
    )
  }
});

module.exports = Source;
