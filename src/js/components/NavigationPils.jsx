const React = require('react');
const boot = require('react-bootstrap/lib');
var Row = boot.Row;
var Col = boot.Col;
var Router = require('react-router-component');
var Link = Router.Link;

let NavigationPils = React.createClass({
  getInitialState() {
    return {active : this.props.active};
  },

  componentDidMount() {
  },

  classActive(number) {
    if (number == this.state.active) return "active";
    else return "";
  },

  render() {
    return (
      <div style={topNavStyle}>
        <Row>
          <Col sm={12} md={6}>
            <ul className="nav nav-pills">
              <li role="presentation" className={this.classActive(1)}><Link global href='/'> Home </Link> </li>
              <li role="presentation" className={this.classActive(2)}><Link global href ='/tx'> Transactions </Link></li>
              <li role="presentation" className={this.classActive(3)}><Link global href ='/profile'> Profile </Link></li>
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
});

var topNavStyle = {
  paddingTop :'2em'
}

module.exports = NavigationPils;
