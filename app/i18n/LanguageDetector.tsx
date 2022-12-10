import { LanguageDetectorAsyncModule } from 'i18next';

import * as RNLocalize from 'react-native-localize';

import { loadFromAsyncStorage_UserPreferencesLanguage_Value, writeToAsyncStorage_UserPreferencesLanguage } from '../stores/GlobalState';

const LanguageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  init: () => { },
  detect: async (callback: (lang: string) => void) => {
    try {
      // Get stored language from Local Realm User Preference
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
      console.warn('Error reading language', error);
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      //save a user's language choice in Async storage
      await writeToAsyncStorage_UserPreferencesLanguage(language)
    } catch (error) {
      console.warn('Error writing language', error);
    }
  },
};

export default LanguageDetector;
