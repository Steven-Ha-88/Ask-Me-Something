import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

// Optional Google Authentication

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '937211303462-k26tk5dh47pik36ful8hbonkbuj0om0r.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    const { signIn, signOut } = this.props;
    const { currentUser } = this.auth;
    console.log(currentUser.get().w3.ig);
    if (isSignedIn) {
      signIn(currentUser.get().getId(), currentUser.get().w3.ig);
    } else {
      signOut();
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    // console.log(this.props);
    const { isSignedIn } = this.props;
    const { onSignOutClick, onSignInClick } = this;
    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn) {
      return (
        <button className="btn btn-outline-primary btn-sm" onClick={onSignOutClick}>
          <i className="" />
        Sign Out
        </button>
      );
    }
    return (
      <button className="btn btn-outline-primary btn-sm" onClick={onSignInClick}>
        <i className="" />
        Log In
      </button>
    );
  }

  render() {
    const { renderAuthButton } = this;
    return <div>{renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
