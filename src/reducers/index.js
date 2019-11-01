import { combineReducers } from 'redux';
import TabReducer from './reducer_tabs';

const rootReducer = combineReducers({
  tabs: TabReducer
});

export default rootReducer;
