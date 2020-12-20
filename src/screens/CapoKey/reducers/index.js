import {combineReducers} from 'redux';
import keys from './KeysReducer';
import selectedValues from './SectionsReducer';

export default combineReducers({
  keys,
  selectedValues,
});
