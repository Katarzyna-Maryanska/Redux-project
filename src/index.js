import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from "redux";
//Provider wrap App, it is a helper to enject our store to react components
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const store = createStore(rootReducer);

//need a property store, now the store is connected to react application at least a bit
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
