import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../actions/index';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: ''
};
class SignUp extends Component {
  state = initialState;

  formRef = () => null;

  errorRef = () => null;

  handleSubmit = (e) => {
    const { signUp } = this.props;
    e.preventDefault();
    signUp(this.state);
    this.formRef.reset();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} ref={ref => this.formRef = ref}>
          <div className="form-group">
            <h4>Sign Up</h4>
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" onChange={this.handleChange} placeholder="Password" />
            <small id="passwordHelpBlock" className="form-text text-muted">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="text">First Name</label>
            <input type="text" className="form-control" id="firstName" onChange={this.handleChange} placeholder="First Name" />
          </div>
          <div className="form-group">
            <label htmlFor="text">Last Name</label>
            <input type="text" className="form-control" id="lastName" onChange={this.handleChange} placeholder="Last Name" />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
            <div>
              {authError ? <p className="authError">{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError
});

export default connect(mapStateToProps, { signUp })(SignUp);
