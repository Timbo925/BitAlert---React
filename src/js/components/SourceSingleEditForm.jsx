const React = require('react');
const boot = require('react-bootstrap/lib');
const Table = boot.Table;
const Input = boot.Input;

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
        {source.addressList.map(function(address, index) {
          return (
            <Table>
              <thead>
                <tr>
                  <th> Address </th> <th> Balance </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {address.address} </td> <td> {address.getBalanceSat()} </td>
                </tr>
              </tbody>
            </Table>
          )
        })}
      </form>
    );
  }
});

module.exports = sourceSingleEditForm;
