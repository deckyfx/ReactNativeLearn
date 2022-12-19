// Must be used in component inside AppProvider, LocalRealmProvider, and LanguageProvider
import { useCallback, useEffect, useState } from 'react';

import { EJSON } from 'bson';

import Config from 'react-native-config';

import { useFetch } from '@decky.fx/react-native-essentials';

import useUserPreference from './useUserPreference';

import { UserPreferenceKeys } from '../realm/models/UserPreference';

export enum RealmWebhookMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export type WebhookOptions = {
    method?: RealmWebhookMethod,
    body?: any
    headers?: any,
}

export interface ResultSchema {
    data?: EJSON.SerializableTypes | null,
    error?: Error | null,
}

export interface ResponseSchema {
    data?: EJSON.SerializableTypes | null,
    error?: string | null,
    errorCode?: string | null,
    message?: string | null,
    status?: boolean
}

const useRealmWebhook = (endpoint: string, options: WebhookOptions) => {
    const { value: lang } = useUserPreference(UserPreferenceKeys.LANGUAGE);

    const { value: token } = useUserPreference(UserPreferenceKeys.ACCESS_TOKEN);

    const [result, setResult] = useState<ResultSchema>({
        data: null,
        error: null
    });

    options.method = options.method ? options.method : RealmWebhookMethod.POST;
    options.headers = options.headers ? options.headers : {
        'Content-Type': 'application/json',
        lang: lang?.getValue() || "id",
        Authorization: token?.getValue() ? 'Bearer ' + token?.getValue() : undefined,
    };
    if (!options.headers.Authorization) {
        delete options.headers.Authorization;
    }
    options.body = (options.body == RealmWebhookMethod.POST ||
        options.method == RealmWebhookMethod.PUT ||
        options.method == RealmWebhookMethod.DELETE) ? JSON.stringify(options.body) : undefined;

    const { data: fetchData, error: fetchError, loading, fetch } = useFetch(Config.REALM_WEBHOOK_URL + endpoint, options);

    const retry = useCallback(async (newoptions: WebhookOptions | undefined | null) => {
        if (!newoptions) {
            newoptions = {}
        }
        Object.keys(options).forEach((key) => {
            if ((newoptions as any)[key] === undefined) {
                (newoptions as any)[key] = (options as any)[key];
            }
        })
        await fetch(Config.REALM_WEBHOOK_URL + endpoint, newoptions);
    }, []);

    const setData = async () => {
        if (fetchData) {
            const response = EJSON.deserialize(fetchData) as ResponseSchema;
            if (!response.status || response.errorCode || !response.data) {
                return setResult({
                    data: null,
                    error: new Error(response.message ? response.message : response.errorCode || '')
                })
            }
            setResult({
                data: response.data,
                error: null
            })
        }
    }

    const setInError = async () => {
        if (fetchError) {
            setResult({
                data: null,
                error: fetchError
            })
        }
    }

    useEffect(() => {
        setData()
    }, [fetchData]);

    useEffect(() => {
        setInError()
    }, [fetchError]);


    return { loading, result: result.data, error: result.error, retry };
};

export default useRealmWebhook;