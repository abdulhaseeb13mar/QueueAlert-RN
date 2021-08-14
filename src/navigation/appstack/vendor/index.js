import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import constants from '../../../theme/constants';
import {WrapperScreen, HeaderMenuVendor} from '../../../components';

//Screens
import {HomeScreen, QueueList} from '../../../screens/vendor';

const Stack = createStackNavigator();

export default function VendorStack() {
  const {appScreens} = constants;
  return (
    <WrapperScreen>
      <HeaderMenuVendor />
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
        <Stack.Screen name={appScreens.QueueList} component={QueueList} />
      </Stack.Navigator>
    </WrapperScreen>
  );
}
