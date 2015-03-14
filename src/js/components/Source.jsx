var React = require('react');
var boot = require('react-bootstrap/lib');
var ModalTrigger = boot.ModalTrigger;
var walletActions = require('../actions/WalletActions');
var SourceDetailModal = require('./SourceDetailModal.jsx');

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
        <td> <a onClick={this.updateSource}> Update </a>
             <ModalTrigger modal={<SourceDetailModal data={source}/>}>
               <a> Detail </a>
             </ModalTrigger>
        </td>
      </tr>
    )
  }
});

module.exports = Source;
