import {combineReducers} from 'redux';
import constants from '../theme/constants';

const userInfo = null;

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

export default combineReducers({userReducer});
