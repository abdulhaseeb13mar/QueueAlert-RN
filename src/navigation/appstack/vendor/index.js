import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import constants from '../../../theme/constants';

//Screens
import {HomeScreen} from '../../../screens/vendor';

const Stack = createStackNavigator();

export default function VendorStack() {
  const {appScreens} = constants;
  return (
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
    </Stack.Navigator>
  );
}
