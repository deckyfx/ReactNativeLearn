

import React from 'react';

import { StatusBar, useColorScheme } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
    children?: JSX.Element | JSX.Element[],
};

const NavigationProvider = ({ children }: Props) => {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <React.Fragment>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
            />
            <SafeAreaProvider>
                <NavigationContainer>
                    {children}
                </NavigationContainer>
            </SafeAreaProvider>
        </React.Fragment>
    );
}

export default NavigationProvider; 