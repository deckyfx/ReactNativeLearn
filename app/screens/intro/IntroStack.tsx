import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IntroStackRouteNames from './IntroStackRouteNames';

import IntroScreen from './IntroScreen';

const Stack = createNativeStackNavigator();

const IntroStack = () => {
  return (
    <Stack.Navigator initialRouteName={IntroStackRouteNames.IntroScreen}>
      <Stack.Screen
        name={IntroStackRouteNames.IntroScreen}
        component={IntroScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default IntroStack;
