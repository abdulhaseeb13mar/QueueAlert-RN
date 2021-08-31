const Constants = {
  async: {
    user: 'user',
    currentNum: 'currentNum',
    vendorsList: 'vendorsList',
    isAccepting: 'isAccepting',
  },
  collections: {
    People: 'People',
    Queues: 'Queues',
    Queue: 'Queue',
    Vendors: 'Vendors',
  },
  actionTypes: {
    SET_USER_INFO: 'SET_USER_INFO',
    INCREMENT_NUMBER: 'INCREMENT_NUMBER',
    DECREMENT_NUMBER: 'DECREMENT_NUMBER',
    SET_CURRENT_NUMBER: 'SET_CURRENT_NUMBER',
    SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
    SET_HEIGHT: 'SET_HEIGHT',
    SET_QUEUE: 'SET_QUEUE',
    SET_IS_ACCEPTING: 'SET_IS_ACCEPTING',
    UPDATE_PROFILE_PHOTO: 'UPDATE_PROFILE_PHOTO',
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
    QueueList: 'QueueList',
    UserInfo: 'UserInfo',
    AddPerson: 'AddPerson',
    Bookings: 'Bookings',
  },
  snackbarColors: {
    Success: '#2e7d32',
    Error: '#d50000',
    Info: '#24806CFF',
  },
  snackbarType: {
    SNACKBAR_SUCCESS: 'SNACKBAR_SUCCESS',
    SNACKBAR_ERROR: 'SNACKBAR_ERROR',
    SNACKBAR_INFO: 'SNACKBAR_INFO',
  },
};

export default Constants;
