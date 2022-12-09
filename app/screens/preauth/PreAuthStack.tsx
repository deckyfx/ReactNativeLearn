import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PreAuthStackRouteNames from './PreAuthStackRouteNames';

import LoginScreen from './login/LoginScreen';
import RegisterStack from './register/RegisterStack';

const Stack = createNativeStackNavigator();

const PreAuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={PreAuthStackRouteNames.LoginScreen}>
      <Stack.Screen
        name={PreAuthStackRouteNames.LoginScreen}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PreAuthStackRouteNames.RegisterStack}
        component={RegisterStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PreAuthStack;
