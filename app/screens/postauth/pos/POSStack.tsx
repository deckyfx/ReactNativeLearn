import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import POSStackRouteNames from './POSStackRouteNames';

import POSScreen from './pos/POSScreen';

const Stack = createNativeStackNavigator();

const PostAuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={POSStackRouteNames.POSScreen}>
      <Stack.Screen
        name={POSStackRouteNames.POSScreen}
        component={POSScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default PostAuthStack;
