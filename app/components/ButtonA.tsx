import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import {S} from '../stores/Store';

const ButtonA = ({}) => {
  const increaseValue = () => {
    console.log(S);
    S.updateSampleValue();
  };

  return (
    <TouchableOpacity onPress={increaseValue}>
      <Text>Increase Value</Text>
    </TouchableOpacity>
  );
};

export default ButtonA;
