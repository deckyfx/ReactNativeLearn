import React from 'react';

import { View, StyleSheet, ViewStyle, Text, Pressable } from 'react-native';

import useUserPreference from '../../hooks/useUserPreference';

import { UserPreferenceKeys } from '../../realm/models/UserPreference';

const IntroScreen = ({ }) => {
  const { update: haveSeeIntro } = useUserPreference(UserPreferenceKeys.HAVE_SEE_INTRO);

  const { update: gotoRegister } = useUserPreference(UserPreferenceKeys.INTRO_TO_REGISTER);

  const toLogin = () => {
    haveSeeIntro(true);
  };

  const toRegister = () => {
    gotoRegister(true);
    haveSeeIntro(true);
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
