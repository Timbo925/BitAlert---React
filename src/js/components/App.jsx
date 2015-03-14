const React = require('react');
const TodoStore = require('../stores/TodoStore');
const ActionCreator = require('../actions/TodoActionCreators');
const Button = require('react-bootstrap/lib/Button');
const Jumbotron = require('react-bootstrap/lib/Jumbotron');
const TaskList = require('./TaskList.jsx');
const Source = require('./Source.jsx');
const WalletStore = require('../stores/WalletStore');
const Wallet = require('./Wallet.jsx');

let App = React.createClass({

  getInitialState() {
    return {
      wallet: WalletStore.loadWallet() //App launches by loading wallet from user
    }
  },

  _onChange() {
    this.setState(TodoStore.getAll()); //When something changed get new event
  },

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange); //App listens to store for changeEvent aka mixins: [Store.mixin]
    //WalletStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },


  render() {
    let {tasks} = this.state;
    return (
      <div className="container">

        <Wallet wallet={this.state.wallet} />

      </div>
    );
  }

});

module.exports = App;
