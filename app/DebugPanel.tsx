import React from 'react';

import {Text, View} from 'react-native';

import Config from 'react-native-config';

import useDebugPanelDisplay from './hooks/useDebugPanelDisplay';

const DebugPanel = () => {
  const {toggle, generateStyle} = useDebugPanelDisplay();

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
        }}></View>
    </View>
  );
};

export default DebugPanel;
