import * as React from 'react';

import {View, StyleSheet, ViewStyle} from 'react-native';

import {RadialGradient} from 'react-native-gradients';

import {StackActions, useNavigation} from '@react-navigation/native';

import {useTimeout} from '@decky.fx/react-native-essentials';

import useSharkLogoDimension from '../hooks/useSharkLogoDimension';

import SharkLogo from '../assets/svg/shark-logo.svg';

import RouteNames from '../RouteNames';

const colorList = [
  {offset: '0%', color: '#FFFFFF', opacity: '1'},
  {offset: '87%', color: '#0093E9', opacity: '1'},
];

const SplashScreen = ({}) => {
  const {logoHeight, logoWidth, getBackdropDimensions} =
    useSharkLogoDimension();

  const navigation = useNavigation();

  const splashScreenEnd = () => {
    // if auth
    //navigation.dispatch(StackActions.replace(RouteNames.IntroStack, {}));
    // if not auth
    //navigation.dispatch(StackActions.replace(RouteNames.IntroStack, {}));
    // if not auth and first time
    navigation.dispatch(StackActions.replace(RouteNames.IntroStack, {}));
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
