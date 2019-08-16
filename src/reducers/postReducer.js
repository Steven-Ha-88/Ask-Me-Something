import _ from 'lodash';
import {
  CREATE_POST,
  CREATE_POST_ERROR,
  CREATE_COMMENT,
  CREATE_COMMENT_ERROR,
  EDIT_POST,
  EDIT_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from '../actions/types';

const initState = {
  forums: [{}]
};

export default (state = initState, action) => {
  switch (action.type) {
    case CREATE_POST:
      console.log('created project', action.formValues);
      return state;
    case CREATE_POST_ERROR:
      console.log('create forum error', action.err);
      return state;
    case CREATE_COMMENT:
      console.log('comment submitted', action.formValues);
      return state;
    case CREATE_COMMENT_ERROR:
      console.log('create comment error', action.err);
      return state;
    case EDIT_POST:
      console.log('edited post success', action.formValues);
      return state;
    case EDIT_ERROR:
      console.log('edited post error', action.err);
      return state;
    case DELETE_POST_SUCCESS:
      console.log('deleted post success');
      return state;
    case DELETE_POST_ERROR:
      console.log('deleted post error: ', action.err);
      return state;
    default:
      return state;
  }
};
