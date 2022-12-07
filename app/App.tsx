import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

import Config from 'react-native-config';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

import './i18n/i18n.config';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ButtonA from './components/ButtonA';
import DisplayA from './components/DisplayA';
import ChangeLanguage from './components/ChangeLanguage';
import LanguageUsed from './components/LanguageUsed';
import UseQueryExample from './components/UseQueryExample';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

console.log(Config);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <ButtonA />
              <DisplayA />
              <ChangeLanguage />
              <LanguageUsed />
              <UseQueryExample />
            </View>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
