import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import DeleteModal from '../DeleteModal';
import history from '../../history';
import { deletePost } from '../../actions';

class ForumDelete extends React.Component {
  renderActions() {
    const { id } = this.props.match.params;
    const { deletePost } = this.props;

    return (
      <React.Fragment>
        <button onClick={() => deletePost(id)} className="btn btn-danger">Delete</button>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <DeleteModal onDismiss={() => history.push('/')} title="Delete Post" actions={this.renderActions()} />
    );
  }
}

const mapStateToProps = ({ firestore: { data } }, ownProps) => ({
  forum: data.Forums && data.Forums[ownProps.match.params.id]
});

export default compose(firestoreConnect(props => [{ collection: 'Forums', doc: props.match.params.id }]),
  connect(mapStateToProps, { deletePost }))(ForumDelete);
