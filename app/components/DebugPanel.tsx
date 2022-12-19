import React, { useEffect } from 'react';

import { TouchableOpacity, Text, View } from 'react-native';

import Config from 'react-native-config';

import useDebugPanelDisplay from '../hooks/useDebugPanelDisplay';
import useRealmLogin from '../hooks/useRealmLogin';

import useUserPreference from '../hooks/useUserPreference';

const DebugPanel = () => {
  const { toggle, generateStyle } = useDebugPanelDisplay();

  const { value: signin, update: setSignin, remove } = useUserPreference("signin");

  const { loading, result, error, login } = useRealmLogin()

  const addUserPreference = () => {
    login("decky.fiyemonda@shark.tech", "1234567");
  }

  const login2 = () => {
    login("decky.fiyemonda@shark.tech", "1234567a");
  }

  if (!Config.DEBUG_ENABLED) {
    return null;
  }

  useEffect(() => {
    if (result) {
      console.log("!!!!!!!!!!!!", (result as any).outlets[0].posIds);
    }
  }, [loading, result, error])

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
        <TouchableOpacity onPress={login2} style={{ backgroundColor: 'red' }}>
          <Text>Press Me 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DebugPanel;
