import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Comment from './forumComments';
import { createComment } from '../../actions/index';

const initialState = {
  comment: null,
  commentError: ''
};

class ForumDisplay extends React.Component {
 state = initialState;

  formRef = () => null;

  validate = () => {
    let commentError = '';

    if (!this.state.comment) {
      commentError = 'Comment cannot be blank';
    }

    if (commentError) {
      this.setState({ commentError });
      return false;
    }
    return true;
  }

  handleSubmit = (e) => {
    const { createComment } = this.props;
    e.preventDefault();
    // console.log(this.state);
    const isValid = this.validate;
    console.log(this.state);
    if (isValid) {
      createComment(this.props.match.params.id, this.state);
      this.setState(initialState);
      this.formRef.reset();
    }
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    // console.log(this.props);
    const { forum, comments } = this.props;
    return (
      <div className="ui container">
        <form className="form-display" onSubmit={this.handleSubmit} ref={ref => this.formRef = ref}>
          <div>
            <p className="author">
              {`Posted by ${forum && forum.authorFirstName} ${forum && forum.authorLastName}`}
            </p>
            <p>
              {moment(forum && forum.createdAt.toDate()).calendar()}
            </p>
          </div>
          <h3>{forum && forum.title}</h3>
          <div>
            <p>{forum && forum.description}</p>
          </div>
          <div>
            <textarea className="form-control comment-input" onChange={this.handleOnChange} id="comment" rows="3" placeholder="What are your thoughts?" />
            <div style={{ fontSize: 12, color: 'red' }}>
              {this.state.commentError}
            </div>
          </div>
          <div>
            <button className="btn btn-primary">Post</button>
          </div>
          <Comment comments={comments} key={comments.id} />
        </form>
      </div>
    );
  }
}


const mapStateToProps = (({ firestore: { data, ordered }, forums }, props) => ({
  forum: data.Forums && data.Forums[props.match.params.id],
  comments: ordered.comments || forums.forums
}));

export default compose(
  firestoreConnect(props => [{ collection: 'Forums', doc: props.match.params.id },
    {
      collection: 'Forums', doc: props.match.params.id, subcollections: [{ collection: 'comments' }], storeAs: 'comments', orderBy: ['createdAt', 'asc']
    }]),
  connect(mapStateToProps, { createComment })
)(ForumDisplay);
