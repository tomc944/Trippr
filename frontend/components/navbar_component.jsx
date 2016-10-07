import React from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, FormGroup,
         NavDropdown, MenuItem, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/session_actions';
import SearchStore from '../stores/search_store';
import SearchActions from '../actions/search_actions';
import Fuse from 'fuse.js';
import classNames from 'classnames';

const NavbarComponent = React.createClass({
  getInitialState() {
    return ({ searchTitles: SearchStore.allTitles(), searchInput: '' })
  },
  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
    SearchStore.addListener(this._onChange);
    SearchActions.fetchAllSearches();
  },
  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      this.clearSearch();
    }
  },
  clearSearch() {
    this.setState({ searchInput: '' });
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  handleLogOut() {
    SessionActions.logOut(this.goToLogin);
  },
  goToLogin() {
    /* TODO: This needs to be deprecated, callback should not be put here
    but rather in the dispatching session action */
    this.props.history.push('/login');
  },
  _onChange() {
    this.setState({ searchTitles: SearchStore.allTitles() });
  },
  performSearch() {
    let result;

    const FUSE_OPTIONS = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.5,
      keys: ['title']
    };

    if (!!this.state.searchInput && !!this.state.searchTitles) {
      const fuse = new Fuse(this.state.searchTitles, FUSE_OPTIONS);
      result = fuse.search(this.state.searchInput);
    }

    return result || false;
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
  renderResults() {
    const results = this.performSearch();
    let resultsDiv = <div></div>;

    if (!!results) {
      resultsDiv = results.map(function(result) {
        return (
          <Link
            className='search-result-item'
            key={result.id}
            to={"/posts/" + result.id}>
            {result.title}
          </Link>
        )
      });
    }
    return resultsDiv;
  },
  render () {
    const renderClass = classNames({
      'searched': this.state.searchInput,
      'not-searched': !this.state.searchInput
    })

    return (
      <Navbar fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src='assets/Trippr-logo.png'></img>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Search"
                value={this.state.searchInput}
                onChange={this.update('searchInput')}/>
            </FormGroup>
            {' '}
          </Navbar.Form>
          <div className={renderClass}>
            {this.renderResults()}
          </div>
          <Nav pullRight>
            <NavItem eventKey={1}><Link to='/'>Feed</Link></NavItem>
            <NavItem eventKey={2}><Link to='/posts/new'>New Report</Link></NavItem>
            {this.correctHeaders()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
})

export default NavbarComponent;
