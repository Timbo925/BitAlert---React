const React = require('react');
const boot = require('react-bootstrap/lib');
const Input = boot.Input;
const Button = boot.Button;
const Table = boot.Table;
const Accounting = require('accounting');

let SourceXpubEditForm = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  editLabel() {
    //TODO
  },

  render() {
    var source = this.props.data
    return (
      <form>
        <Input type="text" label='id' value={source.id} readOnly />
        <Input type='text' label='Label' ref='label' defaultValue={source.label} buttonAfter={<Button onClick={this.editLabel} bsStyle='warning'> Edit </Button>}/>
        <Input type='text' label='Type' value={source.sourceType} readOnly/>
        <Input type='text' label='Xpub' value={source.xpub} readOnly />
        <Table>
          <thead>
            <tr>
              <th> Regular Addresses </th> <th> Balance </th> <th>  Txs</th>
            </tr>
          </thead>
          <tbody>
            {source.addressList.map(function(address, index) {
              return (
                <tr key={index}>
                  <td> {address.address} </td>
                  <td> {Accounting.formatMoney(address.getBalanceSat()/100  , { symbol: "bits",  format: "%v %s" })} </td>
                  <td> {address.nb_txs} </td>
                </tr>)
            })}
          </tbody>
        </Table>
        <Table>
          <thead>
            <tr>
              <th> Change Addresses </th> <th> Balance </th> <th> Txs </th>
            </tr>
          </thead>
          <tbody>
            {source.changeAddressList.map(function(address, index) {
              return (
                <tr key={index}>
                  <td> {address.address} </td>
                  <td> {Accounting.formatMoney(address.getBalanceSat()/100  , { symbol: "bits",  format: "%v %s" })} </td>
                  <td> {address.nb_txs} </td>
                </tr>)
            })}
          </tbody>
        </Table>
      </form>
    );
  }
});

module.exports = SourceXpubEditForm;
