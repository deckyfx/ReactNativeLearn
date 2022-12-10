// Must be used in component inside AppProvider

import useFetch from '@decky.fx/react-native-essentials/lib/hooks/useFetch';
import { useCallback, useMemo, useState } from 'react';

import Realm from 'realm';

export enum RealmAuthState {
    None,
    Loading,
    LoginError,
}

const useRealmLogin = () => {
    const [authState, setAuthState] = useState(RealmAuthState.None);

    useFetch

    const login = useCallback(async () => {
        setAuthState(RealmAuthState.Loading);
        const credentials = Realm.Credentials.emailPassword(email, password);
        try {
            await app.logIn(credentials);
            setAuthState(AuthState.None);
        } catch (e) {
            console.log('Error logging in', e);
            setAuthState(AuthState.LoginError);
        }
    }, [email, password, setAuthState, app]);

    return [result, login]
};

export default useRealmLogin;