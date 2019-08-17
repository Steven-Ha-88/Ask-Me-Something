import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/index';

const SignedInLinks = (props) => {
  const { signOut } = props;
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/forum/new" className="nav-link">Create a Post</Link>
      </li>
      <li className="sign-out-btn">
        <Link onClick={() => signOut()} to="/" className="nav-link">Log out</Link>
      </li>
    </ul>
  );
};

const mapStateToProps = state => ({
  profile: state.firebase.profile
});

export default connect(mapStateToProps, { signOut })(SignedInLinks);
