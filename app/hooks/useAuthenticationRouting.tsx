import { useCallback, useState } from 'react';

import { useEffectOnce } from '@decky.fx/react-native-essentials';

import useUserPreference from './useUserPreference';

import { UserPreferenceKeys } from '../realm/models/UserPreference';

export enum AuthenticationRouteState {
    CHECKING,
    WATCH_INTRO,
    LOGIN, // or register
    DONT_HAVE_BUSINESS,
    POS
}

const useAuthenticationRouting = () => {
    const [state, setState] = useState(AuthenticationRouteState.CHECKING);

    const { value: signin } = useUserPreference(UserPreferenceKeys.LOGIN_AS);
    const { value: haveSeenIntro } = useUserPreference(UserPreferenceKeys.HAVE_SEE_INTRO);
    const { value: haveBusiness } = useUserPreference(UserPreferenceKeys.HAVE_BUSINESS);

    const bootstrap = () => {
        if (!haveSeenIntro?.getValue()) {
            setState(AuthenticationRouteState.WATCH_INTRO);
            return;
        }
        if (!signin?.getValue()) {
            setState(AuthenticationRouteState.LOGIN);
            return;
        }
        if (!haveBusiness?.getValue()) {
            setState(AuthenticationRouteState.DONT_HAVE_BUSINESS);
            return;
        }
        setState(AuthenticationRouteState.POS);
    }

    useEffectOnce(bootstrap)

    return state;
};

export default useAuthenticationRouting;
