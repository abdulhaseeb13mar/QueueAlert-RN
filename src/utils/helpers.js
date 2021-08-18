// //Themes
// import { Constants } from '../theme'

// //Constant
// const { emailRegex } = Constants

// export const validateEmail = email => {
//     return emailRegex.test(email)
// }

// export default {
//     validateEmail,
// }

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

export const getStructuredDate = d =>
  d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
