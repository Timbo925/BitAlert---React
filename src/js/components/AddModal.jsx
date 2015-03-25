const React = require('react');
const boot = require('react-bootstrap/lib');
const Modal = boot.Modal;
const Button = boot.Button;
const constants = require('../constants/AppConstants');
const SourceInput = require('./SourceInput.jsx');

let sourceDetailModel = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },


  /**
   * Needs props.accountList
   * @returns {XML}
   */
  render() {
    return (
      <Modal {...this.props} bsStyle="primary" title={'Add Account/Sources: '} animation={false}>
        <div className="modal-body">
          <SourceInput data={this.props.accountList} />
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = sourceDetailModel;
