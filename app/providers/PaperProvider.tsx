import React from 'react';

import {
    Provider as MasterPaperProvider,
    MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

type Props = {
    children?: JSX.Element | JSX.Element[],
};

const PaperProvider = ({ children }: Props) => {
    return (
        <MasterPaperProvider theme={theme}>
            {children}
        </MasterPaperProvider>
    );
};

export default PaperProvider;
