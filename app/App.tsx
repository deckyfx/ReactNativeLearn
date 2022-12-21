// Supress Random Value Generator Warnings
import 'react-native-get-random-values';

// Setup i18n
import './i18n/i18n.config';

import { LocalRealmProvider } from './realm/local/LocalRealmContext';
import PaperProvider from './providers/PaperProvider';
import UIKittenProvider from './providers/UIKittenProvider';
import QueryClientProvider from './providers/QueryClientProvider';
import NavigationProvider from './providers/NavigationProvider';

import AppBootstrap from './components/AppBootstrap';
import AppRoute from './screens/AppRoute';
import DebugPanel from './components/DebugPanel';

const App = () => {
  return (
    <LocalRealmProvider>
      <PaperProvider>
        <UIKittenProvider>
          <QueryClientProvider>
            <NavigationProvider>
              <AppBootstrap />
              <AppRoute />
              <DebugPanel />
            </NavigationProvider>
          </QueryClientProvider>
        </UIKittenProvider>
      </PaperProvider>
    </LocalRealmProvider >
  );
};

export default App;
