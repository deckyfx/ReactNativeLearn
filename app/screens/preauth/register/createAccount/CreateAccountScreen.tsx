import React from 'react';

import {View, StyleSheet, ViewStyle, Text, Pressable} from 'react-native';

import {StackActions, useNavigation} from '@react-navigation/native';

import PreAuthStackRouteNames from '../../PreAuthStackRouteNames';

const CreateAccountScreen = ({}) => {
  const navigation = useNavigation();

  const toLogin = () => {
    navigation.dispatch(
      StackActions.replace(PreAuthStackRouteNames.LoginScreen),
    );
  };

  return (
    <View style={styles.container}>
      <Text>CreateAccount Screen</Text>
      <Pressable onPress={toLogin}>
        <Text>To Login</Text>
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

export default CreateAccountScreen;
