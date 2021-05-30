import 'react-native-gesture-handler';
import NavigationContainer from './src/navigation';
import React, {useEffect} from 'react';

// import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    // LogBox.ignoreAllLogs();
  }, []);

  return <NavigationContainer />;
};

export default App;
