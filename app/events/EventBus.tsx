import {
  EventBus as MasterEventBus,
  createUseEventBus,
} from '@decky.fx/react-native-essentials';

class GlobalEventBus extends MasterEventBus {
  static instance: GlobalEventBus;
  constructor() {
    super();
    if (!GlobalEventBus.instance) {
      GlobalEventBus.instance = this;
    }
    // Initialize object
    super.init();
    return GlobalEventBus.instance;
  }
}

export const EventBusInstance = new GlobalEventBus();
export const E = EventBusInstance; // short hand

export const useEventBus = createUseEventBus(EventBusInstance)!;
