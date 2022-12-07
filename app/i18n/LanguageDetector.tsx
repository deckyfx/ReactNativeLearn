import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageDetectorAsyncModule} from 'i18next';
import * as RNLocalize from 'react-native-localize';

import {loadFromAsyncStorage_UserPreferencesLanguage_Value} from '../stores/GlobalState';

const LanguageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: async (callback: (lang: string) => void) => {
    try {
      //get stored language from Async storage
      await loadFromAsyncStorage_UserPreferencesLanguage_Value().then(
        language => {
          if (language) {
            //if language was stored before, use this language in the app
            return callback(language);
          } else {
            //if language was not stored yet, use device's locale
            const locales = RNLocalize.getLocales();
            if (locales.length > 0) {
              const locale = locales[0];
              return callback(locale.languageCode);
            }
            return callback('en');
          }
        },
      );
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(
        AStoreKeys.USER_PREFERENCES_LANGUAGE,
        language,
      );
    } catch (error) {}
  },
};

export default LanguageDetector;
