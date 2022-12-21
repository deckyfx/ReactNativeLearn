import React from 'react';

import { View, StyleSheet, ViewStyle, Text, Pressable } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';

import PreAuthStackRouteNames from '../PreAuthStackRouteNames';

import LoginForm from './LoginForm';

const LoginScreen = ({ }) => {
  const navigation = useNavigation();

  const toRegister = () => {
    navigation.dispatch(
      StackActions.replace(PreAuthStackRouteNames.RegisterStack),
    );
  };

  const toCreateBusiness = () => {
  };

  const toSelectOutlet = () => {
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <LoginForm />
      <Pressable onPress={toRegister}>
        <Text>To Register</Text>
      </Pressable>
      <Pressable onPress={toCreateBusiness}>
        <Text>To Create Business</Text>
      </Pressable>
      <Pressable onPress={toSelectOutlet}>
        <Text>To Select Outlet</Text>
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

export default LoginScreen;
