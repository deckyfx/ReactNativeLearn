import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RouteNames from './RouteNames';

import SplashScreen from './screens/SplashScreen';

import IntroStack from './screens/intro/IntroStack';
import PreAuthStack from './screens/preauth/PreAuthStack';
import PostAuthStack from './screens/postauth/PostAuthStack';

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.SplashScreen}>
      <Stack.Screen
        name={RouteNames.SplashScreen}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.IntroStack}
        component={IntroStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.PreAuthStack}
        component={PreAuthStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.PostAuthStack}
        component={PostAuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Route;
