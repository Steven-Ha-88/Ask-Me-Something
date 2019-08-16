import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ForumList from '../forum/ForumList';


class Dashboard extends React.Component {
  state = {
    modelIsOpen: false
  }

  toggleModal = () => {
    this.setState({ modelIsOpen: !this.state.modalIsOpen });
  }


  render() {
    console.log(this.props);
    const {
      forums, notifications, auth, comments
    } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container" key={forums.id}>
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <h4 className="dashboard-header">Forum</h4>
            <ForumList forums={forums} key={forums.id} comments={comments} />
          </div>
          <div className="col-sm-12 col-md-4 offset-md-1">
            <h4 className="dashboard-header">Notifications</h4>
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forums: state.firestore.ordered.Forums || state.forums.forums, // google why map function doesnt work
  profile: state.firebase.profile,
  comments: state.firestore.ordered.comments || state.forums.forums,
  notifications: state.firestore.ordered.notifications,
  auth: state.firebase.auth
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'Forums', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 6, orderBy: ['time', 'desc'] }])
)(Dashboard);
