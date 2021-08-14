import {combineReducers} from 'redux';
import constants from '../theme/constants';
import {height as InitalHeight} from '../components';

const {actionTypes} = constants;

const userInfo = null;
const currentNumber = 0;
const currentScreen = 'Home';
const height = InitalHeight;
const queue = [];

const userReducer = (state = userInfo, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFO:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

const ScreenReducer = (state = currentScreen, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SCREEN:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

const HeightReducer = (state = height, action) => {
  switch (action.type) {
    case actionTypes.SET_HEIGHT:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

const NummberReducer = (state = currentNumber, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_NUMBER:
      state = action.payload + 1;
      return state;

    case actionTypes.DECREMENT_NUMBER:
      state = action.payload - 1;
      return state;

    case actionTypes.SET_CURRENT_NUMBER:
      state = action.payload;
      return state;

    default:
      break;
  }
  return state;
};

const QueueReducer = (state = queue, action) => {
  switch (action.type) {
    case actionTypes.SET_QUEUE:
      state = [...action.payload];
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({
  userReducer,
  NummberReducer,
  ScreenReducer,
  HeightReducer,
  QueueReducer,
});
