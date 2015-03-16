const React = require('react');
const boot = require('react-bootstrap/lib');
const Table = boot.Table;
const Input = boot.Input;
const Accounting = require('accounting');

let sourceSingleEditForm = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    var source = this.props.data;
    return (
      <form>
        <Input type="text" label='id' value={source.id} readOnly />
        <Input type='text' label='Label' defaultValue={source.label}/>
        <Input type='text' label='Type' value={source.sourceType} readOnly/>
        <Table>
          <thead>
            <tr>
              <th> Address </th> <th> Balance </th>
            </tr>
          </thead>
          <tbody>
            {source.addressList.map(function(address, index) {
              return (
                <tr key={index}>
                  <td> {address.address} </td> <td> {Accounting.formatMoney(address.getBalanceSat()/100  , { symbol: "bits",  format: "%v %s" })} </td>
                </tr>)
            })}
          </tbody>
        </Table>
      </form>
    );
  }
});

module.exports = sourceSingleEditForm;
