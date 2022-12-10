

import React, { createContext, useContext, useRef } from 'react';

import Realm from 'realm';

import { createRealmContext } from '@realm/react';

import LocalRealmConfig from './LocalRealmConfig';

interface LocalRealmContextInterface {
    useQuery: <T>(type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>)) => Realm.Results<T & Realm.Object<unknown, never>>
    useObject: <T>(type: string | (new (...args: any) => T), primaryKey: Realm.PrimaryKey) => (T & Realm.Object<T, never>) | null,
    useRealm: () => Realm,
    realm: Realm | null
}

type Props = {
    children?: JSX.Element | JSX.Element[],
};

const ContextWrapper = createContext<LocalRealmContextInterface | null>(null);

const RealmContext = createRealmContext(LocalRealmConfig());

export const LocalRealmProvider = ({ children }: Props) => {
    const { RealmProvider, useQuery, useObject, useRealm } = RealmContext;

    const realmRef = useRef<Realm | null>(null);

    return (
        <ContextWrapper.Provider value={{
            useQuery,
            useObject,
            useRealm,
            realm: realmRef.current
        }} >
            <RealmProvider realmRef={realmRef}>
                {children}
            </RealmProvider>
        </ContextWrapper.Provider >
    );
}

export const useLocalRealm = () => {
    const value = useContext(ContextWrapper);
    if (value == null) {
        throw new Error('useLocalRealm() called outside of a LocalRealmProvider?');
    }
    return value;
};