import {
  Store as MasterStore,
  createUseStore,
} from '@decky.fx/react-native-essentials';

// Register extra state here
import {
  GlobalState,
  updateSampleValue,
  loadFromAsyncStorage_UserPreferencesLanguage,
  writeToAsyncStorage_UserPreferencesLanguage,
} from './GlobalState';

class GlobalStore extends MasterStore {
  static instance: GlobalStore;
  // Construct the store here
  constructor() {
    super();
    if (!GlobalStore.instance) {
      GlobalStore.instance = this;
    }
    this.init();
    return GlobalStore.instance;
  }

  // Init the store here
  async init() {
    super.init();
    const language = await loadFromAsyncStorage_UserPreferencesLanguage();
    this._state = {
      ...this.initial(),
      ...language,
    };
  }

  initial() {
    // Init the state here
    return {
      ...GlobalState,
    };
  }

  // Register modifier here
  updateSampleValue(value: number | null = null) {
    this.modify(updateSampleValue(this.state, value));
  }

  async updateLanguage(value: string) {
    const language = await writeToAsyncStorage_UserPreferencesLanguage(value);
    this.modify(language);
  }
}

export const StoreInstance = new GlobalStore();
export const S = StoreInstance; // short hand

export const useStore = createUseStore(StoreInstance)!;
