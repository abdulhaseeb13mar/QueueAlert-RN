import constants from '../theme/constants';

export const setUserInfoAction = userInfo => {
  return async dispatch => {
    dispatch({
      type: constants.actionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};
