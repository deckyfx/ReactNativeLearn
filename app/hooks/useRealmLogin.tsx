// Must be used in component inside AppProvider
import { useCallback, useEffect, useState } from 'react';

import DeviceInfo from 'react-native-device-info';

import useRealmWebhook from './useRealmWebhook';

import useUserLogin from './useUserLogin';

import WEBHOOK_END_POINTS from '../constants/WEBHOOK_END_POINTS';

import { UserLoginConstructor } from '../realm/models/UserLogin';

const useRealmLogin = () => {
    const { loading, result, error, retry } = useRealmWebhook(WEBHOOK_END_POINTS.LOGIN, {});

    const { value, update, remove } = useUserLogin();  

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
        remove();
        update(result as UserLoginConstructor)
    }

    useEffect(() => {
        parseResult();
    }, [result])

    return { loading, value, error, login, logout }
};

export default useRealmLogin;