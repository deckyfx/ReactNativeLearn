// Supress Random Value Generator Warnings
import 'react-native-get-random-values';

// Setup i18n
import './i18n/i18n.config';

import { LocalRealmProvider } from './realm/local/LocalRealmContext';
import NavigationProvider from './providers/NavigationProvider';
import PaperProvider from './providers/PaperProvider';
import QueryClientProvider from './providers/QueryClientProvider';

import AppBootstrap from './components/AppBootstrap';
import AppRoute from './screens/AppRoute';
import DebugPanel from './components/DebugPanel';

const App = () => {
  return (
    <LocalRealmProvider>
      <PaperProvider>
        <QueryClientProvider>
          <NavigationProvider>
            <AppBootstrap />
            <AppRoute />
            <DebugPanel />
          </NavigationProvider>
        </QueryClientProvider>
      </PaperProvider>
    </LocalRealmProvider >
  );
};

export default App;
