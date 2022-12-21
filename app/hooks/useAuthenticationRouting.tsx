import { useEffect, useState } from 'react';

import useUserPreference from './useUserPreference';

import { UserPreferenceKeys } from '../realm/models/UserPreference';
import useUserLogin from './useUserLogin';
import useTimeout from '@decky.fx/react-native-essentials/lib/hooks/useTimeout';

export enum AuthenticationRouteState {
    CHECKING,
    WATCH_INTRO,
    LOGIN, // or register
    DONT_HAVE_BUSINESS,
    POS
}

const useAuthenticationRouting = () => {
    const [state, setState] = useState(AuthenticationRouteState.CHECKING);

    const { value: haveSeenIntro } = useUserPreference(UserPreferenceKeys.HAVE_SEE_INTRO);

    const { value: userLogin } = useUserLogin();

    const bootstrap = () => {
        if (!haveSeenIntro?.getValue()) {
            setState(AuthenticationRouteState.WATCH_INTRO);
            return;
        }
        if (!userLogin) {
            setState(AuthenticationRouteState.LOGIN);
            return;
        }
        if (!userLogin?.business) {
            setState(AuthenticationRouteState.DONT_HAVE_BUSINESS);
            return;
        }
        setState(AuthenticationRouteState.POS);
    }

    // Give delay to show splashscreen
    const [execute] = useTimeout(bootstrap, 3000, false)

    useEffect(execute, [haveSeenIntro, userLogin])

    return state;
};

export default useAuthenticationRouting;
