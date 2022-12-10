import React from 'react';

import { TouchableOpacity, Text, View } from 'react-native';

import Config from 'react-native-config';

import useDebugPanelDisplay from '../hooks/useDebugPanelDisplay';

import useUserPreference from '../hooks/useUserPreference';

const DebugPanel = () => {
  const { toggle, generateStyle } = useDebugPanelDisplay();

  const { value: signin, update: setSignin, remove } = useUserPreference("signin");

  console.log(signin)

  const addUserPreference = () => {
    setSignin("decky")
  }

  if (!Config.DEBUG_ENABLED) {
    return null;
  }

  return (
    <View style={generateStyle()}>
      <View
        style={{
          backgroundColor: 'gray',
          alignItems: 'center',
        }}
        onTouchStart={toggle}>
        <Text>Debug Panel</Text>
      </View>
      <View
        style={{
          maxWidth: 600,
          padding: 10,
        }}>
        <TouchableOpacity onPress={addUserPreference} style={{ backgroundColor: 'red' }}>
          <Text>Press Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DebugPanel;
