import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="card">
      <div className="">
        {/* <div className="meta">Friend</div> */}
        <div className="description">
          <ul className="feed">
            {notifications && notifications.map(feed => (
              <li key={feed.id}>
                <span className="purple-text">
                  {feed.user}
                  {' '}
                </span>
                <span>{feed.content}</span>
                <div className="feed-time">
                  {moment(feed.time.toDate()).fromNow()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Notifications;
