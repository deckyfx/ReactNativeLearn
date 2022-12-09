import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PostAuthStackRouteNames from './PostAuthStackRouteNames';

import POSStack from './pos/POSStack';

import SelectOutletScreen from './selectOutlet/SelectOutletScreen';
import CreateBusinessScreen from './createBusiness/CreateBusinessScreen';

const Stack = createNativeStackNavigator();

const PostAuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={PostAuthStackRouteNames.POSStack}>
      <Stack.Screen
        name={PostAuthStackRouteNames.POSStack}
        component={POSStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PostAuthStackRouteNames.SelectOutlet}
        component={SelectOutletScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={PostAuthStackRouteNames.CreateBusiness}
        component={CreateBusinessScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PostAuthStack;
