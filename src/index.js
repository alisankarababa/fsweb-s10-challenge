import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk"
import { createLogger } from 'redux-logger' 

import { reducerGratitudeJournal } from "./reducers"

const middleware = composeWithDevTools(applyMiddleware(thunk, createLogger()));

const reducers = combineReducers({

    gratitudeJournal: reducerGratitudeJournal
    
});

const store = legacy_createStore(reducers, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

    <Provider store={store}>
        <BrowserRouter>
          <>
            <App />
          </>
        </BrowserRouter>
    </Provider>
);