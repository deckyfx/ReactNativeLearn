import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PreAuthStackRouteNames from './PreAuthStackRouteNames';

import LoginScreen from './login/LoginScreen';

import RegisterStack from './register/RegisterStack';

import useUserPreference from '../../hooks/useUserPreference';

import { UserPreferenceKeys } from '../../realm/models/UserPreference';

const Stack = createNativeStackNavigator();

const PreAuthStack = () => {
  const { value: toRegister } = useUserPreference(UserPreferenceKeys.INTRO_TO_REGISTER);
  
  return (
    <Stack.Navigator initialRouteName={toRegister?.getValue() ? PreAuthStackRouteNames.RegisterStack : PreAuthStackRouteNames.LoginScreen}>
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
