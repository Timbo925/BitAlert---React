const React = require('react');
const boot = require('react-bootstrap/lib');
const SingleForm = require('./SourceSingleForm.jsx');
const XpubForm = require('./SourceXpubForm.jsx');
const AccountForm = require('./AccountForm.jsx');

let SourceInput = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  formSubmitSingle(e) {
    e.preventDefault();
    console.log(this.refs.singleForm.getDOMNode().serialize())
  },

  render() {
    var accountList = this.props.data;
    return (
      <boot.TabbedArea defaultActiveKey={2}>
        <boot.TabPane eventKey={2} tab="Account">
          <AccountForm />
        </boot.TabPane>
        <boot.TabPane eventKey={0} tab="Single Address Source">
          <SingleForm data={accountList}/>
        </boot.TabPane>
        <boot.TabPane eventKey={1} tab="Xpub Source">
          <XpubForm data={accountList}/>
        </boot.TabPane>
      </boot.TabbedArea>
    );
  }
});

module.exports = SourceInput;
