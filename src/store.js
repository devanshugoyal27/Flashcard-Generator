import { createStore } from 'redux';
import flashCardData from './redux/reducers/reducers';


const store = createStore(flashCardData);

export default store;