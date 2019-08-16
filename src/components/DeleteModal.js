import React from 'react';
import ReactDOM from 'react-dom';

// e.stopProagation prevents click event to follow its parent path by navigating to some other page
const DeleteModal = props => ReactDOM.createPortal(
  <div onClick={props.onDismiss} className="ui dimmer modals visible active">
    <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
      <div className="header">{props.title}</div>
      <div className="content"><h5>Are you sure you want to delete this post?</h5></div>
      <div className="actions">
        {props.actions}
      </div>
    </div>
  </div>, document.querySelector('#modal')
);

export default DeleteModal;
