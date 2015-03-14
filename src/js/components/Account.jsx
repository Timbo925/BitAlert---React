const React = require('react');
const boot = require('react-bootstrap/lib');
const Source = require('./Source.jsx');

let Account = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    //console.log(this.props.data)
  },

  onClick(e) {
    console.log('Click Event Account');

  },

  render() {
    var account = this.props.data;
    console.log("Render Account");

    return (
        <boot.Panel header={account.label} eventKey={this.props.index} bsStyle="primary">
          <boot.Table hover>
            <thead>
              <tr>
                <th>Amount</th>
                <th> Type </th>
                <th> Label </th>
                <th> Balance </th>
              </tr>
            </thead>
            <tbody>
              {account.sourceList.map(function(source,i) {
                return <Source key= {source.id} data={source} index = {i}/>
              })}
            </tbody>
          </boot.Table>
        </boot.Panel>
    )
  }
});

module.exports = Account;

//<tr onClick={this.onClick}>
//  <td > {this.props.data.id}</td>
//  <td> {this.props.data.label} </td>
//  <td> {this.props.data.getBalanceSat()} </td>
//  <td> {JSON.stringify(this.props.data.sourceList)} </td>
//</tr>)
