import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_USER, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

/*
  1. state is global state of the Redux "store" residing in index.js
  2. action are plain objects with a type field, and describe "what happened".
  3. when an action is dispatched, the store runs these functions to determine change in state.

  Reducer Rules:
    1. Reducers should only calculate the new state value based on the state and action arguments
    2. Reducers are not allowed to modify the existing state. Instead, they must make immutable updates,
       by copying the existing state and making changes to the copied values.
    3. Reducers must not do any asynchronous logic, calculate random values, or cause other "side effects"
 */
export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      // Add currentPage and numberOfPages while updating posts in state.
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      // Update posts based on search response
      return { 
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
       };
    case FETCH_BY_USER:
      // Update posts based on user
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      // Add post to current state.
      return { ...state, post: action.payload.post };
    case CREATE:
      // Add new post within current state of posts
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case COMMENT:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    default:
      return state;
  }
};