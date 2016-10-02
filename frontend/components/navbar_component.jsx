import React from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/session_actions';

const NavbarComponent = React.createClass({
  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },
  handleLogOut() {
    SessionActions.logOut(this.goToLogin);
  },
  goToLogin() {
    /* TODO: This needs to be deprecated, callback should not be put here
    but rather in the dispatching session action */
    this.props.history.push('/login')
  },
  correctHeaders() {
    if (SessionStore.isUserLoggedIn()) {
      return <NavItem eventKey={3} onClick={this.handleLogOut}>Logout</NavItem>
    } else {
      return (
          [<NavItem eventKey={4}><Link to ='/login'>Login</Link></NavItem>,
        <NavItem eventKey={5}><Link to='/signup'>Signup</Link></NavItem>]
      )

    }
  },
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <img src='assets/Trippr-logo.png'></img>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}><Link to='/'>Feed</Link></NavItem>
            <NavItem eventKey={2}><Link to='/posts/new'>New Report</Link></NavItem>
            <NavItem eventKey={3}>Profile</NavItem>
            {this.correctHeaders()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})

export default NavbarComponent;
