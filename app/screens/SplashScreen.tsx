import * as React from 'react';

import { View, StyleSheet, ViewStyle } from 'react-native';

import { RadialGradient } from 'react-native-gradients';

import { useNavigation } from '@react-navigation/native';

import { useTimeout } from '@decky.fx/react-native-essentials';

import SharkLogo from '../assets/svg/shark-logo.svg';

import useSharkLogoDimension from '../hooks/useSharkLogoDimension';

import useUserPreference from '../hooks/useUserPreference';

const colorList = [
  { offset: '0%', color: '#FFFFFF', opacity: '1' },
  { offset: '87%', color: '#0093E9', opacity: '1' },
];

const SplashScreen = ({ }) => {
  const { logoHeight, logoWidth, getBackdropDimensions } =
    useSharkLogoDimension();

  const { value: signin, update: setSignin, remove } = useUserPreference("signin");

  const navigation = useNavigation();

  const splashScreenEnd = () => {
  };

  useTimeout(splashScreenEnd, 3000, true);

  return (
    <View style={styles.container}>
      <View style={styles.svgBackground}>
        <RadialGradient colorList={colorList} {...getBackdropDimensions()} />
      </View>
      <SharkLogo width={logoWidth} height={logoHeight} />
    </View>
  );
};

type Style = {
  container: ViewStyle;
  svgBackground: ViewStyle;
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
