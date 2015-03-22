const React = require('react');
const boot = require('react-bootstrap/lib');
const Panel = boot.Panel;
const Account = require('./Account.jsx');

let AccountTable = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    //console.log('Making AccountTable of');
    //console.log(this.props.data)
  },

  render() {
    var accounts = this.props.data;
    return (
      <boot.PanelGroup defaultActiveKey='0' accordion>
          {accounts.map(function(account, i) {
            return (
              <Account key={account.id} data={account} index={i}/>
            )
          })}
      </boot.PanelGroup>
    );
  }
});

module.exports = AccountTable;
