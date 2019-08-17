import React from 'react';
import moment from 'moment';

const forumComment = ({ comments }) => (
  comments.map(comment => (
    <div className="ui minimal comments" key={comment.id}>
      <div className="comment">
        <div className="content">
          <a className="author" href="/">
            {comment.authorFirstName}
            {' '}
            {comment.authorLastName}
          </a>
          <div className="metadata">
            <span className="date">{moment(comment.createdAt && comment.createdAt.toDate()).calendar()}</span>
          </div>
          <div className="text">
            <p>{comment.comment}</p>
          </div>
          <div className="actions">
            <a className="reply" href="/">Reply</a>
          </div>
        </div>
      </div>
    </div>
  )));

export default forumComment;
