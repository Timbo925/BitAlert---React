const React = require('react');
const Boot = require('react-bootstrap');
const {Input, Col, Row, Button} = Boot;

let AccountEditForm = React.createClass({
  getInitialState() {
    console.log('INitial State')
    return {label: this.props.account.label};
  },

  componentDidMount() {
  },

  /**
   * Setting the label state correct when receiving new props
   * @param next -- new props received
   */
  componentWillReceiveProps(next) {
    this.setState({label: next.account.label})
  },
  handleChange(event) {
    this.setState({label: event.target.value});
  },

  editLabel() {

  },

  render() {
    var account = this.props.account;
    return (
      <form>
        <Input type="text" label='Id' value={account.id} readOnly />
        <Input type="text" label='Label' ref='label' onChange={this.handleChange} value={this.state.label} buttonAfter={<Button onClick={this.editLabel} bsStyle='warning'> Edit </Button>}/>
      </form>
  );
  }
});

module.exports = AccountEditForm;
