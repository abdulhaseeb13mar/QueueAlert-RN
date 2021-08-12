import constants from '../theme/constants';

export const setUserInfoAction = userInfo => {
  return async dispatch => {
    dispatch({
      type: constants.actionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};

export const incrementNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: constants.actionTypes.INCREMENT_NUMBER,
      payload: num,
    });
  };
};

export const decrementNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: constants.actionTypes.DECREMENT_NUMBER,
      payload: num,
    });
  };
};

export const setCurrentNumberAction = num => {
  return async dispatch => {
    dispatch({
      type: constants.actionTypes.SET_CURRENT_NUMBER,
      payload: num,
    });
  };
};
