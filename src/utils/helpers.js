import Snackbar from 'react-native-snackbar';
import constants from '../theme/constants';

const {snackbarType, snackbarColors} = constants;

export const getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const SortQueue = queue =>
  queue.sort((a, b) =>
    a.number > b.number ? 1 : b.number > a.number ? -1 : 0,
  );

export const getStructuredDate = d =>
  d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

export const showSnackbar = (text, type) => {
  var backgroundColor = '';

  switch (type) {
    case snackbarType.SNACKBAR_SUCCESS:
      backgroundColor = snackbarColors.Success;
      break;
    case snackbarType.SNACKBAR_ERROR:
      backgroundColor = snackbarColors.Error;
      break;
    case snackbarType.SNACKBAR_INFO:
      backgroundColor = snackbarColors.Info;
      break;
    default:
      backgroundColor = snackbarColors.Info;
  }

  Snackbar.show({
    text: text,
    backgroundColor: backgroundColor,
  });
};

export const generateId = () => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
