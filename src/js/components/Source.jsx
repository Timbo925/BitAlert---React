var React = require('react');
var boot = require('react-bootstrap/lib');
var Button = boot.Button;
var Glyphicon = boot.Glyphicon;
var ModalTrigger = boot.ModalTrigger;
var ButtonToolbar = boot.ButtonToolbar;
var walletActions = require('../actions/WalletActions');
var SourceDetailModal = require('./SourceDetailModal.jsx');
var Accounting = require('accounting');
var WalletStore = require('../stores/WalletStore');

let Source = React.createClass({
  getInitialState() {
    return {isLoading: false}
  },

  componentDidMount() {

  },

  updateSource() {
    var comp = this;
    this.setState({isLoading: true});
    walletActions.updateSource(this.props.data, function(err) {
      comp.setState({isLoading: false})
    }); //update given data
  },

  deleteSource() {
    walletActions.deleteSource(this.props.data.id)
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
             <Button onClick={!this.state.isLoading ? this.updateSource : null} disabled={this.state.isLoading}><Glyphicon glyph="refresh" /></Button>
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
