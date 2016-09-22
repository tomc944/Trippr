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
    this.props.history.push('/login')
  },
  correctHeaders() {
    if (SessionStore.isUserLoggedIn()) {
      return <NavItem eventKey={3} onClick={this.handleLogOut}>Logout</NavItem>
    } else {
      return (
        <div>
          <NavItem eventKey={4}><Link to ='/login'>Login</Link></NavItem>
          <NavItem eventKey={5}><Link to='/signup'>Signup</Link></NavItem>
        </div>
      )

    }
  },
  render () {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            Trippr
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1}><Link to='/'>Feed</Link></NavItem>
            <NavDropdown title='Reports' id="report-dropdown" eventKey={2}>
              <MenuItem eventKey={2.1}><Link to='/posts'>All Reports</Link></MenuItem>
              <MenuItem eventKey={2.2}><Link to='/posts/new'>New Report</Link></MenuItem>
            </NavDropdown>
            <NavItem eventKey={3}>Profile</NavItem>
            {this.correctHeaders()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})

export default NavbarComponent;
