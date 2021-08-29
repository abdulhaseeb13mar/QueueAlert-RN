import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from '../utils/';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfoAction, setHeight} from '../redux/actions';
import constants from '../theme/constants';
import {height} from '../components';
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';
import {
  Provider as PaperProvider,
  DefaultTheme,
  // DarkTheme,
} from 'react-native-paper';

//Stacks
import AuthStack from './authStack';
import PeopleStack from './appstack/people';
import VendorStack from './appstack/vendor';

const Routes = props => {
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  // const [userType] = useCustomStateSelector('userReducer', ['userType']);
  const HEIGHT =
    (Platform.OS === 'ios' ? height : frame.height) -
    (insets.bottom + insets.top);

  useEffect(() => {
    SetHeight();
    getAsyncUserInfo();
  }, []);

  const SetHeight = async () => {
    await props.setHeight(HEIGHT);
  };

  const getAsyncUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(constants.async.user);
      let data = userInfo != null ? JSON.parse(userInfo) : {userType: 'none'};
      props.setUserInfoAction(data);
    } catch (e) {
      console.log(e);
    }
  };

  const LightTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      accent: '#E5E5E5',
      border: 'rgba(196,196,196,1)',
      subtext: '#141414',
      selection: 'rgba(63,81,181, 0.6)',
    },
  };

  return (
    <NavigationContainer
      ref={navigatorRef => Navigator.setTopLevelNavigator(navigatorRef)}>
      <PaperProvider theme={LightTheme}>
        {props.user != null ? (
          props.user.userType === 'person' ? (
            <PeopleStack />
          ) : props.user.userType === 'vendor' ? (
            <VendorStack />
          ) : (
            <AuthStack />
          )
        ) : (
          <AuthStack />
        )}
      </PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, {setUserInfoAction, setHeight})(Routes);
