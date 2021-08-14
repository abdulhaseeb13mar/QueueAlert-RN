const Constants = {
  async: {
    user: 'user',
    currentNum: 'currentNum',
    vendorsList: 'vendorsList',
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
  },
};

export default Constants;
