import React from 'react';

import { View, StyleSheet, ViewStyle, Text, Pressable } from 'react-native';

import { StackActions, useNavigation } from '@react-navigation/native';

import { useEffectOnce } from '@decky.fx/react-native-essentials';

import PreAuthStackRouteNames from '../../PreAuthStackRouteNames';

import useUserPreference from '../../../../hooks/useUserPreference';

import { UserPreferenceKeys } from '../../../../realm/models/UserPreference';

const CreateAccountScreen = ({ }) => {
  const navigation = useNavigation();

  const { update: toRegister } = useUserPreference(UserPreferenceKeys.INTRO_TO_REGISTER);

  const toLogin = () => {
    navigation.dispatch(
      StackActions.replace(PreAuthStackRouteNames.LoginScreen),
    );
  };

  useEffectOnce(() => {
    toRegister(false);
  })

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
