import React from 'react'
import { render } from 'react-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'

const NavbarComponent = React.createClass({
  render () {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/">Trippr</a>
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})

export default NavbarComponent;
