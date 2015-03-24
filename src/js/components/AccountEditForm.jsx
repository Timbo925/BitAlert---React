const React = require('react');
const Boot = require('react-bootstrap');
const {Input, Col, Row, Button} = Boot;

let AccountEditForm = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  editLabel() {

  },
  render() {
    var account = this.props.account;
    return (
      <form>
        <Input type="text" label='Id' value={account.id} readOnly />
        <Input type='text' label='Label' ref='label' defaultValue={account.label} buttonAfter={<Button onClick={this.editLabel} bsStyle='warning'> Edit </Button>}/>
      </form>
  );
  }
});

module.exports = AccountEditForm;
