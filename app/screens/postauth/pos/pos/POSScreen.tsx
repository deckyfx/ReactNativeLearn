import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';

import {View, StyleSheet, ViewStyle, Text, Pressable} from 'react-native';

import PostAuthStackRouteNames from '../../PostAuthStackRouteNames';
import RouteNames from '../../../../RouteNames';

const POSScreen = ({}) => {
  const navigation = useNavigation();

  const selectOutlet = () => {
    navigation.dispatch(
      StackActions.replace(PostAuthStackRouteNames.SelectOutlet, {}),
    );
  };

  const logout = () => {
    navigation.dispatch(StackActions.replace(RouteNames.PreAuthStack, {}));
  };

  return (
    <View style={styles.container}>
      <Text>POS Screen</Text>
      <Pressable onPress={selectOutlet}>
        <Text>Select Outlet</Text>
      </Pressable>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

type Style = {
  container: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default POSScreen;
