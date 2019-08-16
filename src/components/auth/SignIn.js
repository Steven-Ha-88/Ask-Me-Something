import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Logo } from '../navbar/Header';
import { signIn } from '../../actions/index';


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = (e) => {
    const { signIn } = this.props;
    e.preventDefault();
    signIn(this.state);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form form-color">
          <div className="form-group">
            <Logo src="https://image.flaticon.com/icons/svg/874/874951.svg" alt="Logo" />
            <h4>Sign In</h4>
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" onChange={this.handleChange} placeholder="Password" />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Log In</button>
            <div className="auth-error">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authError: state.auth.authError,
  auth: state.firebase.auth
});

export default connect(mapStateToProps, { signIn })(SignIn);
