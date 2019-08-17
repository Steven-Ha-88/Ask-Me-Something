import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import ForumForm from './ForumForm';
import { editPost } from '../../actions/index';
import '../../styles.css';
class ForumEdit extends React.Component {
  onSubmit = (formValues) => {
    const { id } = this.props.match.params;
    const { editPost } = this.props;
    editPost(id, formValues);
  }

  render() {
    const { auth, forum } = this.props;
    // console.log(this.props);
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="ui container">
        <ForumForm initialValues={_.pick(forum, 'title', 'description')} onSubmit={this.onSubmit} title="Edit" />
      </div>
    );
  }
}

const mapStateToProps = ({ firestore: { data }, firebase }, ownProps) => ({
  auth: firebase.auth,
  forum: data.Forums && data.Forums[ownProps.match.params.id]
});

export default compose(firestoreConnect(props => [{ collection: 'Forums', doc: props.match.params.id }]), connect(mapStateToProps, { editPost }))(ForumEdit);
