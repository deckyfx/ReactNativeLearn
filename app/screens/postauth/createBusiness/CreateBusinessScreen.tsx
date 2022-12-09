import React from 'react';

import {StackActions, useNavigation} from '@react-navigation/native';

import {View, StyleSheet, ViewStyle, Text, Pressable} from 'react-native';

import PostAuthStackRouteNames from '../PostAuthStackRouteNames';

const CreateBusinessScreen = ({}) => {
  const navigation = useNavigation();

  const selectOutlet = () => {
    navigation.dispatch(
      StackActions.replace(PostAuthStackRouteNames.SelectOutlet, {}),
    );
  };

  return (
    <View style={styles.container}>
      <Text>CreateBusiness Screen</Text>
      <Pressable onPress={selectOutlet}>
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

export default CreateBusinessScreen;
