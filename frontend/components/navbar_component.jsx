import React from 'react'
import { render } from 'react-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

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
            <NavItem eventKey={1}>Feed</NavItem>
            <NavItem eventKey={2}>Reports</NavItem>
            <NavItem eventKey={3}>Profile</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})

module.exports = NavbarComponent;
