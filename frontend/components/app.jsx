import React from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import NavbarComponent from './navbar_component';
import FooterComponent from './footer_component';

const App = React.createClass({
	render() {
		return (
			<div>
				<NavbarComponent />
				{ this.props.children }
				<FooterComponent />
			</div>
		)
	}
});

module.exports = App;
