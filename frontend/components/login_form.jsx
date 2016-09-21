import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import SessionStore from '../stores/session_store';
import ErrorStore from '../stores/error_store';
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
    // if errors propogate this will automatically call a rerender
    this.errorToken = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionToken = SessionStore.addListener(this.redirectIfLoggedIn);
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
      return <li key={ i }>{ errorMsg }</li>;
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
      <div>
        <Form horizontal>
          Welcome to Trippr!
          <br/>
          Please { this.formType() } or { navLink }
          {this.fieldErrors('base')}
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Username
            </Col>
            <Col sm={10}>
              { this.fieldErrors("username") }

              <FormControl
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.update("username")}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              { this.fieldErrors("password") }
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.update("password")}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit" onClick={this.handleCreation}>
                {this.formType().toUpperCase()}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
})

export default LoginForm;
