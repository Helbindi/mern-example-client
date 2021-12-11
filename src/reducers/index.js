import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';

// combines all the seperate reducer functions for posts and auth before being created by store.
export const reducers = combineReducers({ posts, auth });