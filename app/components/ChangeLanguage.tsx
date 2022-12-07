import React from 'react';

import {TouchableOpacity, Text} from 'react-native';

import {useTranslation} from 'react-i18next';

import {S} from '../stores/Store';

const ChangeLanguage = ({}) => {
  const {i18n} = useTranslation(); //i18n instance

  const setToEN = async () => {
    S.updateLanguage('en');
    i18n.changeLanguage('en');
  };

  const setToID = async () => {
    S.updateLanguage('id');
    i18n.changeLanguage('id');
  };

  return (
    <>
      <TouchableOpacity onPress={setToEN}>
        <Text>Set Lanuage To EN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={setToID}>
        <Text>Set Lanuage To ID</Text>
      </TouchableOpacity>
    </>
  );
};

export default ChangeLanguage;
