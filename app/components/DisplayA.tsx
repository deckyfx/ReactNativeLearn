import React, {useEffect} from 'react';

import {Text} from 'react-native';

import {useStore} from '../stores/Store';
import {GlobalStateHook_SampleValue} from '../stores/GlobalState';

const DisplayA = ({}) => {
  const state = useStore(GlobalStateHook_SampleValue);

  useEffect(() => {
    console.log('Changed?', state);
  }, [state]);

  return <Text>{state}</Text>;
};

export default DisplayA;
