const React = require('react');
const boot = require('react-bootstrap/lib');
var Const = require('../constants/AppConstants');
const WalletAction = require('../actions/WalletActions');

let sourceSingleForm = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentDidMount() {
  },

  getFormData() {
    return {
      account: this.refs.account.getInputDOMNode().value,
      label: this.refs.label.getInputDOMNode().value,
      address: this.refs.address.getInputDOMNode().value,
      sourceType: Const.SourceTypes.Single
    }
  },

  resetForm() {
    this.refs.label.getInputDOMNode().value = '';
    this.refs.address.getInputDOMNode().value = '';
  },

  submitForm(e) {
    e.preventDefault();
    var data = this.getFormData();
    this.resetForm();
    WalletAction.addNewSource(data);
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
        <boot.Input type="text" label="Label" ref='label'> </boot.Input>
        <boot.Input type='text' label='Bitcoin Address' ref='address'> </boot.Input>
        <boot.Input type='submit' value='Add Single Source'> </boot.Input>
      </form>
    );
  }
});

module.exports = sourceSingleForm;
