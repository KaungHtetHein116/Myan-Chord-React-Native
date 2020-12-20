import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';
import keys from './KeysReducer';
import selectedValues from './SectionsReducer';

export default combineReducers({
  data: DataReducer,
  auth: AuthReducer,
  keys,
  selectedValues,
});
