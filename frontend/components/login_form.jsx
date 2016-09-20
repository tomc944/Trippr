import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

const LoginForm = React.createClass({
  getInitialState() {
    return (
      username: "",
      password: ""
    )
  },
  componentDidMount() {
    this.errorToken = ErrorStore.addListener();
    this.sessionToken = SessionStore.addListener();
  },
  componentWillUnmount() {
    this.errorToken.remove();
    this.sessionToken.remove()
  },
  
})

export default LoginForm;
