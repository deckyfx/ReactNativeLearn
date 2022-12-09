import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';

import {View, StyleSheet, ViewStyle, Text, Pressable} from 'react-native';

import RouteNames from '../../../RouteNames';

import PostAuthStackRouteNames from '../PostAuthStackRouteNames';

const SelectOutletScreen = ({}) => {
  const navigation = useNavigation();

  const toPOS = () => {
    navigation.dispatch(
      StackActions.replace(PostAuthStackRouteNames.POSStack, {}),
    );
  };

  const logout = () => {
    navigation.dispatch(StackActions.replace(RouteNames.PreAuthStack, {}));
  };

  return (
    <View style={styles.container}>
      <Text>SelectOutlet Screen</Text>
      <Pressable onPress={toPOS}>
        <Text>To POS</Text>
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

export default SelectOutletScreen;
