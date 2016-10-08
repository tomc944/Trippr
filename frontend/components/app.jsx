import React from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import NavbarComponent from './navbar_component';
import FooterComponent from './footer_component';

const App = React.createClass({
	/* TODO: Fix navbar so it doesn't have to hold onto the history as a props */
	render() {
		return (
			<div>
				<NavbarComponent
					location={this.props.location.pathname}
					history={this.props.history}/>
				{ this.props.children }
				<FooterComponent />
			</div>
		)
	}
});

export default App
