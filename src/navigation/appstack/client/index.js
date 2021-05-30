import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

//Screens
import { Home } from '../../../screens/client'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
      }}>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
}
