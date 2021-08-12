const Constants = {
  async: {
    user: 'user',
    currentNum: 'currentNum',
    vendorsList: 'vendorsList',
  },
  collections: {
    People: 'People',
    Queues: 'Queues',
    Vendors: 'Vendors',
  },
  actionTypes: {
    SET_USER_INFO: 'SET_USER_INFO',
    INCREMENT_NUMBER: 'INCREMENT_NUMBER',
    DECREMENT_NUMBER: 'DECREMENT_NUMBER',
    SET_CURRENT_NUMBER: 'SET_CURRENT_NUMBER',
    SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
    SET_HEIGHT: 'SET_HEIGHT',
  },
  authScreens: {
    Login: 'Login',
    SignupVendor: 'SignupVendor',
    SignupPeople: 'SignupPeople',
  },
  appScreens: {
    Home: 'Home',
    SingleVendor: 'SingleVendor',
    Profile: 'Profile',
  },
};

export default Constants;
