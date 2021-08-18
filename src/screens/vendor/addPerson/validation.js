export const isFormValid = (name, email, phone) => {
  return name === ''
    ? prepareResponse(false, 'name', 'name is empty')
    : email !== '' && (!email.includes('@') || !email.includes('.'))
    ? prepareResponse(false, 'email', 'email is not valid')
    : phone !== '' && phone.length !== 11
    ? prepareResponse(false, 'phone', 'number must have 11 digits')
    : prepareResponse(true, '', '');
};

const prepareResponse = (status, category, msg) => {
  return {
    status: status,
    errMsg: msg,
    errCategory: category,
  };
};
