import constants from '../theme/constants';
const {actionTypes} = constants;

export const setUserInfoAction = userInfo => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};

export const incrementNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: actionTypes.INCREMENT_NUMBER,
      payload: num,
    });
  };
};

export const decrementNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: actionTypes.DECREMENT_NUMBER,
      payload: num,
    });
  };
};

export const setCurrentNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_CURRENT_NUMBER,
      payload: num,
    });
  };
};

export const setCurrentScreen = screen => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_CURRENT_SCREEN,
      payload: screen,
    });
  };
};

export const setHeight = height => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_HEIGHT,
      payload: height,
    });
  };
};

export const setQueue = queue => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_QUEUE,
      payload: queue,
    });
  };
};

export const setIsAccepting = isAccepting => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_IS_ACCEPTING,
      payload: isAccepting,
    });
  };
};
