import {useState} from 'react';

import {GestureResponderEvent, ViewStyle} from 'react-native';

import {useBoolean} from '@decky.fx/react-native-essentials';

const useDebugPanelDisplay = () => {
  const {value: visible, toggle: toggleDisplay} = useBoolean(false);

  const [posX, setPosX] = useState(0);

  const toggle = (e: GestureResponderEvent): void => {
    setPosX(e.nativeEvent.pageX - 50);
    toggleDisplay();
  };

  const generateStyle = (): ViewStyle => {
    return {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: visible ? posX : posX / 2,
      backgroundColor: '#ababab',
      width: visible ? 100 : 600,
      height: visible ? 25 : 400,
      borderColor: 'black',
      borderWidth: 2,
    };
  };

  return {
    toggle,
    generateStyle,
  };
};

export default useDebugPanelDisplay;
