export const isFormValid = (name, email, phone, password, confirmPassword) => {
  return name === ''
    ? prepareResponse(false, 'name', 'name is empty')
    : email === ''
    ? prepareResponse(false, 'email', 'email is Empty')
    : !email.includes('@') || !email.includes('.')
    ? prepareResponse(false, 'email', 'email is not valid')
    : phone === ''
    ? prepareResponse(false, 'phone', 'number is empty')
    : phone.length !== 11
    ? prepareResponse(false, 'phone', 'number must have 11 digits')
    : password.length < 5
    ? prepareResponse(
        false,
        'password',
        'Password must be at least 5 character',
      )
    : confirmPassword === ''
    ? prepareResponse(false, 'confirmPassword', 'Enter Confirm Password')
    : password !== confirmPassword
    ? prepareResponse(false, 'confirmPassword', 'Password does not match')
    : prepareResponse(true, '', '');
};

const prepareResponse = (status, category, msg) => {
  return {
    status: status,
    errMsg: msg,
    errCategory: category,
  };
};
