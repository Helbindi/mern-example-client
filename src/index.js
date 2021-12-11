import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

/*
  1. Redux is a pattern and library for managing and updating application state,
     using events called "actions".
  2. Utilizing a centralized "store" for states to be used throughout an application.
  3. Rules are used to ensure that the state can only be updated in a predictable fashion.
      a. Never directly modify or change the state inside the Redux store.
      b. Create an action object that describes "something that happened in the application",
         and then dispatch the action to the store to tell it what happened.
      c. When an action is dispatched, the store runs the root reducer function, and lets it calculate
         the new state based on the old state and the action.
      d. Finally, the store notifies subscribers that the state has been updated so the UI can be updated with the new data.
  
  Diagram: https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif
*/
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);