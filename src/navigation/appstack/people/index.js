import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import constants from '../../../theme/constants';
import {WrapperScreen, HeaderMenuPeople} from '../../../components';

//Screens
import {
  HomeScreen,
  SingleVendor,
  Profile,
  Bookings,
} from '../../../screens/people';

const Stack = createStackNavigator();

export default function PeopleStack(props) {
  const {appScreens} = constants;
  return (
    <WrapperScreen>
      <HeaderMenuPeople />
      <Stack.Navigator
        initialRouteName={appScreens.Home}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}>
        <Stack.Screen name={appScreens.Home} component={HomeScreen} />
        <Stack.Screen name={appScreens.SingleVendor} component={SingleVendor} />
        <Stack.Screen name={appScreens.Profile} component={Profile} />
        <Stack.Screen name={appScreens.Bookings} component={Bookings} />
      </Stack.Navigator>
    </WrapperScreen>
  );
}
