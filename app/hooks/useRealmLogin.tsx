// Must be used in component inside AppProvider
import { useCallback, useEffect, useState } from 'react';

import DeviceInfo from 'react-native-device-info';

import useRealmWebhook from './useRealmWebhook';

import WEBHOOK_END_POINTS from '../constants/WEBHOOK_END_POINTS';

const useRealmLogin = () => {
    const { loading, result, error, retry } = useRealmWebhook(WEBHOOK_END_POINTS.LOGIN, {});

    const login = useCallback(async (username = '', password = '') => {
        await retry({
            body: JSON.stringify({
                username: username,
                password: password,
                serialNumber: await DeviceInfo.getUniqueId(), // On Android it is currently identical to getAndroidId(). On iOS it uses the DeviceUID uid identifier.
                imei: '', // IMEI is deprecated
            })
        })
    }, []); 
    
    const logout = useCallback(async () => {
        
    }, []);


    const parseResult = () => {
        if (!result) return;
    }

    useEffect(() => {
        parseResult();
    }, [result])

    return { loading, result, error, login, logout }
};

export default useRealmLogin;