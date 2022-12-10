import React from 'react';

import { StackActions, useNavigation } from '@react-navigation/native';

import { View, StyleSheet, ViewStyle, Text, Pressable } from 'react-native';

import AppRouteNames from '../AppRouteNames';
import PreAuthStackRouteNames from '../preauth/PreAuthStackRouteNames';

const IntroScreen = ({ }) => {
  const navigation = useNavigation();

  const toLogin = () => {
    navigation.dispatch(
      StackActions.replace(AppRouteNames.PreAuthStack, {
        screen: PreAuthStackRouteNames.LoginScreen,
      }),
    );
  };

  const toRegister = () => {
    navigation.dispatch(
      StackActions.replace(AppRouteNames.PreAuthStack, {
        screen: PreAuthStackRouteNames.RegisterStack,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text>Intro Screen</Text>
      <Pressable onPress={toLogin}>
        <Text>To Login</Text>
      </Pressable>
      <Pressable onPress={toRegister}>
        <Text>To Register</Text>
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

export default IntroScreen;
