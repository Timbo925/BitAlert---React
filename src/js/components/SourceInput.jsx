const React = require('react');
const boot = require('react-bootstrap/lib');
const SingleForm = require('./SourceSingleForm.jsx');
const XpubForm = require('./sourceXpubForm.jsx');

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
      <boot.TabbedArea defaultActiveKey={0}>
        <boot.TabPane eventKey={0} tab="Single Address">
          <SingleForm data={accountList}/>
        </boot.TabPane>
        <boot.TabPane eventKey={1} tab="Xpub Address">
          <XpubForm data={accountList}/>
        </boot.TabPane>
      </boot.TabbedArea>
    );
  }
});

module.exports = SourceInput;
