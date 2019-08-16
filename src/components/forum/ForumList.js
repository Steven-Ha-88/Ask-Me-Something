import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';


class ForumList extends React.Component {
  renderAdmin = (post) => {
    const { auth } = this.props;
    if (auth.uid === post.authorId) {
      return (
        <div>
          <Link to={`/forum/delete/${post.id}`}>
            <i className="right floated x icon" />
          </Link>
          <Link to={`/forum/edit/${post.id}`}>
            <i className="right floated edit icon" />
          </Link>
        </div>
      );
    }
  }

  render() {
    const { forums, comments } = this.props;

    return (
      forums.map(forum => (
        <div className="ui card post" key={forum.id}>
          <div className="content">
            {this.renderAdmin(forum)}
            <Link to={`/forum/${forum.id}`} className="post" forum={forum}>
              <div className="header">{forum.title}</div>
            </Link>
            <div className="description">
              <p>{forum.description}</p>
            </div>
          </div>
          <div className="extra content">
            <span className="left floated arrow">
              <i className="arrow up icon" />
                21.8k
              <i className="arrow down icon" />
            </span>
            <span>
              Comments
            </span>
            <p className="right floated">
              {moment(forum.createdAt && forum.createdAt.toDate()).calendar()}
            </p>
          </div>
        </div>
      ))
    );
  }
}


const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps, null)(ForumList);


// export default compose(
//     firestoreConnect(props => [{ collection: 'Forums', doc: props.match.params.id },
//       {
//         collection: 'Forums', doc: props.match.params.id, subcollections: [{ collection: 'comments' }], storeAs: 'comments', orderBy: ['createdAt', 'asc']
//       }]),
//     connect(mapStateToProps, { createComment })
//   )(ForumDisplay);
