import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ForumForm from './ForumForm';
import { createPost } from '../../actions/index';
import '../../styles.css';


class ForumCreate extends React.Component {
  onSubmit = (formValues) => {
    const { createPost } = this.props;
    createPost(formValues);
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="ui container">
        <ForumForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default connect(mapStateToProps, { createPost })(ForumCreate);
