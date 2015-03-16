var React = require('react');
var boot = require('react-bootstrap/lib');
var Button = boot.Button;
var Glyphicon = boot.Glyphicon;
var ModalTrigger = boot.ModalTrigger;
var ButtonToolbar = boot.ButtonToolbar;
var walletActions = require('../actions/WalletActions');
var SourceDetailModal = require('./SourceDetailModal.jsx');
var Accounting = require('accounting');

let Source = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {

  },

  updateSource() {
    walletActions.updateSource(this.props.data); //update given data
  },

  deleteSource() {
    alert('TODO delete source')
  },

  render() {
    var source = this.props.data;
    return (
      <tr>
        <td> {this.props.index} </td>
        <td> {source.sourceType} </td>
        <td> {source.label} </td>
        <td> {Accounting.formatMoney(source.getBalanceSat()/100  , { symbol: "bits",  format: "%v %s" })} </td>
        <td>
          <ButtonToolbar>
             <Button onClick={this.updateSource}><Glyphicon glyph="refresh" /></Button>
             <ModalTrigger modal={<SourceDetailModal data={source}/>}>
               <Button ><Glyphicon glyph="pencil" /></Button>
             </ModalTrigger>
            <Button onClick={this.deleteSource}><Glyphicon glyph="trash"/></Button>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }
});

module.exports = Source;
