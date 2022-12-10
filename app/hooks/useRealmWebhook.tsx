// Must be used in component inside AppProvider, LocalRealmProvider, and LanguageProvider

import Realm from 'realm';

import { EJSON } from 'bson';

import Config from 'react-native-config';

import { useFetch } from '@decky.fx/react-native-essentials';

import { useCallback, useMemo, useState } from 'react';

export enum RealmWebhookMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

const useRealmWebhook = (endpoint: string, method: RealmWebhookMethod, payload: any) => {
    useFetch(Config.REALM_WEBHOOK_URL + endpoint, )

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

export default useRealmWebhook;

/*
 * endpoint : "your_webhook_endpoint".
 * body : js object.
 * callback : your function to handle received data
 */

const callWebhook = async (
    endpoint = '',
    body = {},
    callback = null,
    accessToken = '',
    method = 'POST',
    headers = null,
) => {
    try {
        const getResponse = await fetch(Config.REALM_WEBHOOK_URL + endpoint, {
            method: method,
            headers: headers
                ? headers
                : {
                    'Content-Type': 'application/json',
                    lang: Strings.getCode(),
                    Authorization: 'Bearer ' + accessToken,
                },
            body:
                method == 'POST' || method == 'PUT' || method == 'DELETE'
                    ? JSON.stringify(body)
                    : null,
        });
        const getJson = await getResponse.json();
        const response = await EJSON.deserialize(getJson);
        if (callback) {
            callback(response);
        }
        return response;
    } catch (e) {
        //handle network error
        console.warn('[CALL WEBHOOK] Error', e);
        const response = { status: false, message: e.toString() };
        callback(response);
    }
};

export default callWebhook;
