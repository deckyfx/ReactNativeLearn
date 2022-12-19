import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuthenticationRouting, { AuthenticationRouteState } from '../hooks/useAuthenticationRouting';

import AppRouteNames from './AppRouteNames';

import SplashScreen from './SplashScreen';
import IntroStack from './intro/IntroStack';
import PreAuthStack from './preauth/PreAuthStack';
import PostAuthStackRouteNames from './postauth/PostAuthStackRouteNames';
import CreateBusinessScreen from './postauth/createBusiness/CreateBusinessScreen';
import POSStack from './postauth/pos/POSStack';

const Stack = createNativeStackNavigator();

const AppRoute = () => {

  const routeState = useAuthenticationRouting();

  const route = (): React.ReactNode => {
    switch (routeState) {
      case AuthenticationRouteState.WATCH_INTRO: {
        return <Stack.Screen
          name={AppRouteNames.IntroStack}
          component={IntroStack}
          options={{
            headerShown: false,
          }}
        />
      }
      case AuthenticationRouteState.LOGIN: {
        return <Stack.Screen
          name={AppRouteNames.PreAuthStack}
          component={PreAuthStack}
          options={{
            headerShown: false,
          }}
        />
      }
      case AuthenticationRouteState.DONT_HAVE_BUSINESS: {
        return <Stack.Screen
          name={PostAuthStackRouteNames.CreateBusiness}
          component={CreateBusinessScreen}
          options={{
            headerShown: false,
          }}
        />
      }
      case AuthenticationRouteState.POS: {
        return <Stack.Screen
          name={PostAuthStackRouteNames.POSStack}
          component={POSStack}
          options={{
            headerShown: false,
          }
          }
        />
      }
      default: {
        return <Stack.Screen
          name={AppRouteNames.SplashScreen}
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
      }
    }
  }

  return (
    <Stack.Navigator>
      {route()}
    </Stack.Navigator>
  );
};

export default AppRoute;
