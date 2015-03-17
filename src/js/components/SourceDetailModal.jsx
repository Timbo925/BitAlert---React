const React = require('react');
const boot = require('react-bootstrap/lib');
const Modal = boot.Modal;
const Button = boot.Button;
const constants = require('../constants/AppConstants');
const SourceSingleEditForm = require('./SourceSingleEditForm.jsx');
const SourceXpubEditForm = require('./SourceXpubEditForm.jsx');

let sourceDetailModel = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    var source = this.props.data;
    var SourceEdit;
    switch (source.sourceType) {
      case constants.SourceTypes.Single:
        SourceEdit = SourceSingleEditForm;
        break;
      case constants.SourceTypes.Xpub:
        SourceEdit = SourceXpubEditForm;
        break;
    }

    return (
      <Modal {...this.props} bsStyle="primary" title={'Source Details: ' + source.label} animation={false}>
        <div className="modal-body">
          <SourceEdit data={source}/>
        </div>


        <div className="modal-footer">
          <Button onClick={this.props.onRequestHide}>Close</Button>
        </div>

      </Modal>
    );
  }
});

module.exports = sourceDetailModel;
