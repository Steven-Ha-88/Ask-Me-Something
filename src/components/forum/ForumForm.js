import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ForumForm extends React.Component {
  renderInput = ({ label, meta, input }) => {
    const className = `form-control ${meta.submitFailed ? 'is-invalid' : ''}`;
    const placeholder = `${input.name === 'title' ? 'Title' : 'Description'}`;
    // console.log(input);
    return (
      <div>
        <label className="label">{label}</label>
        <input {...input} className={className} autoComplete="off" placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    const { onSubmit } = this.props;
    // console.log(formValues);
    onSubmit(formValues);
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="invalid-feedback">
          {error}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const { renderInput, onSubmit } = this;
    // console.log(this.props);
    return (
      <div className="ui container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4>Create a Post</h4>
          <Field name="title" component={renderInput} label="Title" />
          <Field name="description" component={renderInput} label="Description" />
          <div>
            <button className="btn btn-primary">Post</button>
          </div>
        </form>
      </div>

    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a Title';
  }

  // if (!formValues.description) {
  //   errors.description = 'You must enter a Description';
  // }

  return errors;
};

export default reduxForm({
  form: 'postForm',
  validate
})(ForumForm);
