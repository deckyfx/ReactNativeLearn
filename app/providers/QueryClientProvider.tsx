import React from 'react';

import { QueryClient, QueryClientProvider as MasterQueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
    children?: JSX.Element | JSX.Element[],
};

const QueryClientProvider = ({ children }: Props) => {
    return (
        <MasterQueryClientProvider client={queryClient}>
            {children}
        </MasterQueryClientProvider>
    );
};

export default QueryClientProvider;
