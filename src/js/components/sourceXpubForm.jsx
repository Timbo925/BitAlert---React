const React = require('react');
const boot = require('react-bootstrap/lib');
var Const = require('../constants/AppConstants');

let sourceXpubForm = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  getFormData() {
    return {
      account: this.refs.account.getInputDOMNode().value,
      label: this.refs.label.getInputDOMNode().value,
      xpub: this.refs.xpub.getInputDOMNode().value,
      sourceType: Const.SourceTypes.Xpub
    }
  },

  submitForm(e) {
    e.preventDefault();
    console.log(this.getFormData())
  },

  render() {
    var accountList = this.props.data;
    return (
      <form onSubmit={this.submitForm}>
        <boot.Input type="select" label='Account' ref='account'>
          {accountList.map(function(account,i) {
            return <option key={account.id} value={account.id}>{account.label}</option>
          })}
        </boot.Input>
        <boot.Input type='text' label='Label' ref='label'/>
        <boot.Input type='text' label='Xpub value' ref='xpub'/>
        <boot.Input type='submit' value='Add Xpub Source'/>
      </form>
    );
  }
});

module.exports = sourceXpubForm;
