import React from 'react';

import * as eva from '@eva-design/eva';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

type Props = {
    children?: JSX.Element | JSX.Element[],
};

const UIKittenProvider = ({ children }: Props) => {
    return (
        <React.Fragment>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                {children}
            </ApplicationProvider>
        </React.Fragment>
    );
};

export default UIKittenProvider;
