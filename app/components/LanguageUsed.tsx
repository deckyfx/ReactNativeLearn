import React from 'react';

import {Text} from 'react-native';

import {useTranslation} from 'react-i18next';

import {useStore} from '../stores/Store';
import {GlobalStateHook_UserPreferencesLanguage} from '../stores/GlobalState';

const LanguageUsed = ({}) => {
  const {t} = useTranslation();

  const state = useStore(GlobalStateHook_UserPreferencesLanguage);

  return (
    <>
      <Text>{state}</Text>
      <Text>{t('hello')}</Text>
    </>
  );
};

export default LanguageUsed;
