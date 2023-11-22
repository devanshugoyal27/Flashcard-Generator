// Importing the createStore function from Redux and the flashCardData reducer
import { createStore } from 'redux';
import flashCardData from './redux/reducers/reducers';

// Creating a Redux store with the flashCardData reducer
const store = createStore(flashCardData);


export default store;
