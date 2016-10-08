import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import ErrorStore from '../stores/error_store';
import ErrorActions from '../actions/error_actions';
import SessionActions from '../actions/session_actions';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';

const LoginForm = React.createClass({
  getInitialState() {
    return ({
      username: "",
      password: ""
    })
  },
  componentDidMount() {
    /* if errors propogate this will automatically
       call a rerender */
    this.errorToken = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionToken = SessionStore.addListener(this.redirectIfLoggedIn);
  },
  componentWillReceiveProps(newProps) {
    /* clears left-over errors from login or signup
       and doesn't persist them */
    if (newProps.route.path !== this.props.route.path) {
      ErrorActions.clearErrors();
    }
  },
  componentWillUnmount() {
    this.errorToken.remove();
    this.sessionToken.remove()
  },
  update(property) {
    return (e) => this.setState({[property]: e.target.value});
  },
  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      // TODO: LOOK AT A BETTER WAY TO DO THIS
      this.props.history.push('/')
    }
  },
  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());

    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li className='errors' key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },
  formType() {
    return this.props.location.pathname.slice(1);
  },
  handleCreation(e) {
    e.preventDefault();

    const formData = {
      username: this.state.username,
      password: this.state.password
    }

    if (this.props.location.pathname === '/login') {
      SessionActions.logIn(formData);
    } else {
      SessionActions.signUp(formData);
    }
  },
  render() {

    let navLink;
    if (this.formType() === 'login') {
      navLink = <Link to="/signup">signup instead</Link>
    } else {
      navLink = <Link to="/login">login instead</Link>
    }

    return (
      <div className="feed-container">

        <Col sm={6} smOffset={3}>
          <img className='login-background' src='assets/mountain.jpg'></img>
        </Col>
        <Col sm={4} smOffset={4}>
          <Form className='login-form-container' horizontal>
            <Col>
              <h3 className='report-title'>Welcome to Trippr!</h3>
              <p className='link-away'>Please { this.formType() } or { navLink }</p>
              {this.fieldErrors('base')}
            </Col>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel}>
                Username:
              </Col>
              <Col>
                { this.fieldErrors("username") }

                <FormControl
                  type="text"
                  value={this.state.username}
                  placeholder="Enter Username"
                  onChange={this.update("username")}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel}>
                Password:
              </Col>
              <Col>
                { this.fieldErrors("password") }
                <FormControl
                  type="password"
                  value={this.state.password}
                  placeholder="Enter Password"
                  onChange={this.update("password")}/>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col>
                <Button type="submit" onClick={this.handleCreation}>
                  {this.formType().toUpperCase()}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </div>
    )
  }
})

export default LoginForm;
