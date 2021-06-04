import {combineReducers} from 'redux';
import constants from '../theme/constants';

const userInfo = null;
const currentNumber = 0;

const userReducer = (state = userInfo, action) => {
  switch (action.type) {
    case constants.actionTypes.SET_USER_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const NummberReducer = (state = currentNumber, action) => {
  switch (action.type) {
    case constants.actionTypes.INCREMENT_NUMBER:
      state = action.payload + 1;
      return state;

    case constants.actionTypes.DECREMENT_NUMBER:
      state = action.payload - 1;
      return state;

    case constants.actionTypes.SET_CURRENT_NUMBER:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({userReducer, NummberReducer});
