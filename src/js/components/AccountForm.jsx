const React = require('react');
const boot = require('react-bootstrap/lib');
var Input = boot.Input;
var Const = require('../constants/AppConstants');
const WalletAction = require('../actions/WalletActions');

let AccountForm = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  getFormData() {
    return {label: this.refs.label.getInputDOMNode().value}
  },

  submitForm(e) {
    e.preventDefault();
    WalletAction.addNewAccount(this.getFormData());
  },

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <Input type="text" label="Account Label" ref='label' />
        <Input type='submit' value='Add New Account'/>
      </form>
    );
  }
});

module.exports = AccountForm;
