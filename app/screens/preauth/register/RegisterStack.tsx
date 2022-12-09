import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RegisterStackRouteNames from './RegisterStackRouteNames';

import CreateAccountScreen from './createAccount/CreateAccountScreen';

const Stack = createNativeStackNavigator();

const RegisterStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={RegisterStackRouteNames.CreateAccountScreen}>
      <Stack.Screen
        name={RegisterStackRouteNames.CreateAccountScreen}
        component={CreateAccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RegisterStack;
