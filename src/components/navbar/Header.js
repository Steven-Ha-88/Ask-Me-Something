import React from 'react';
import styled from 'styled-components';
import '../../styles.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

export const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const Header = (props) => {
  const { auth } = props;
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <nav className="navbar navbar-expand-sm navbar-light" style={{ backgroundColor: '#FEFEFE' }}>
      <Logo src="https://image.flaticon.com/icons/svg/874/874951.svg" alt="Logo" />
      <Link to="/" className="navbar-brand logo">Reddit</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
        { auth.isLoaded && links }
      </div>
    </nav>
  );
};

const mapStateToProps = state =>
  // console.log(state);
  ({
    auth: state.firebase.auth
  });
export default connect(mapStateToProps)(Header);
