import AsyncStorage from '@react-native-async-storage/async-storage';

export const GlobalStateKeys = Object.freeze({
  SAMPLE_VALUE: 'SAMPLE_VALUE',
  USER_PREFERENCES_LANGUAGE: 'USER_PREFERENCES_LANGUAGE',
});

export type GlobalStateInterface = {
  SAMPLE_VALUE: number;
  USER_PREFERENCES_LANGUAGE: string;
};

export const GlobalState: GlobalStateInterface = {
  SAMPLE_VALUE: 0,
  USER_PREFERENCES_LANGUAGE: 'id', // declare state values
};

export const writeToAsyncStorage = async (
  key: string,
  value: string,
): Promise<{[key: string]: any} | undefined> => {
  try {
    await AsyncStorage.setItem(key, value);
    const modify: {[key: string]: any} = {};
    modify[key] = value;
    return modify;
  } catch (e) {
    return undefined;
  }
};

export const loadFromAsyncStorage = async (
  key: string,
): Promise<{[key: string]: any} | undefined> => {
  try {
    const value = await AsyncStorage.getItem(key);
    const modify: {[key: string]: string | null} = {};
    modify[key] = value;
    return modify;
  } catch (e) {
    // error reading value
    return undefined;
  }
};

export const loadFromAsyncStorage_UserPreferencesLanguage = async (): Promise<
  {[key: string]: any} | undefined
> => {
  return loadFromAsyncStorage(GlobalStateKeys.USER_PREFERENCES_LANGUAGE); // must return json data
};

export const loadFromAsyncStorage_UserPreferencesLanguage_Value =
  async (): Promise<string | undefined> => {
    return loadFromAsyncStorage(GlobalStateKeys.USER_PREFERENCES_LANGUAGE).then(
      value => {
        return Promise.resolve(
          value ? value[GlobalStateKeys.USER_PREFERENCES_LANGUAGE] : '',
        );
      },
    );
  };

export const writeToAsyncStorage_UserPreferencesLanguage = async (
  value: string,
): Promise<{[key: string]: any} | undefined> => {
  return writeToAsyncStorage(GlobalStateKeys.USER_PREFERENCES_LANGUAGE, value); // must return json data
};

export const updateSampleValue = (
  state: GlobalStateInterface,
  value: number | null = null,
): GlobalStateInterface => {
  if (value == null) {
    GlobalState.SAMPLE_VALUE = state.SAMPLE_VALUE + 1; // modify the value
  } else {
    GlobalState.SAMPLE_VALUE = value; // modify the value
  }
  return GlobalState; // must return json data
};

export const GlobalStateHook_SampleValue = (state: GlobalStateInterface) =>
  state.SAMPLE_VALUE; // declare what is returned

export const GlobalStateHook_UserPreferencesLanguage = (
  state: GlobalStateInterface,
) => state.USER_PREFERENCES_LANGUAGE; // declare what is returned
