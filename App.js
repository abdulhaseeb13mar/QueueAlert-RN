import 'react-native-gesture-handler';
import NavigationContainer from './src/navigation';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
// import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    // LogBox.ignoreAllLogs();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
