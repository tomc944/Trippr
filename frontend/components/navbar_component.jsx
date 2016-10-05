import React from 'react';
import { render } from 'react-dom';
import { Navbar, Nav, NavItem, FormGroup,
         NavDropdown, MenuItem, FormControl } from 'react-bootstrap';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import SessionActions from '../actions/session_actions';
import PostStore from '../stores/post_store';
import PostActions from '../actions/post_actions';
import Fuse from 'fuse.js';

const NavbarComponent = React.createClass({
  getInitialState() {
    return ({ postTitles: PostStore.allTitles(), searchInput: '' })
  },
  componentDidMount() {
    SessionStore.addListener(this.forceUpdate.bind(this));
    PostStore.addListener(this._onChange);
    PostActions.fetchAllPosts();
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
    this.setState({ postTitles: PostStore.allTitles() });
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

    if (!!this.state.searchInput && !!this.state.postTitles) {
      const searchIndex = this._convertTitles(this.state.postTitles);
      const fuse = new Fuse(searchIndex, FUSE_OPTIONS);
      result = fuse.search(this.state.searchInput);
    }

    return result || false;
  },
  _convertTitles(titles) {
    const titleKeys = Object.keys(titles);
    let titleArray = [];

    titleKeys.forEach(function(id) {
      titleArray.push(titles[id]);
    })

    return titleArray;
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
    let resultsDiv = <div></div>
    const resultsClass = 'search-list'

    if (!!results) {
      resultsDiv = results.map(function(result) {
        return (
          <Link
            clasName='search-result-item'
            key={result.id}
            to={"/posts/" + result.id}>
            {result.title}
          </Link>
        )
      })
    }
    return resultsDiv;
  },
  render () {

    return (
      <Navbar fixedTop={false}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src='assets/Trippr-logo.png'></img>
          </Navbar.Brand>
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
          {this.renderResults()}
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
