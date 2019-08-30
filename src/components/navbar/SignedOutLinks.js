import React from 'react';
import { Link } from 'react-router-dom';

const SignedOutLinks = () => (
  <ul className="navbar-nav">
    <li className="nav-item">
      <Link to="/signup" className="nav-link">Sign Up</Link>
    </li>
    <li className="nav-item">
      <Link to="/signin" className="nav-link">Log In</Link>
    </li>
  </ul>
);

export default SignedOutLinks;
