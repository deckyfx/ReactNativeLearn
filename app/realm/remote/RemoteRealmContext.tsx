

import React, { createContext, useContext, useRef } from 'react';

import Realm from 'realm';

import { AppProvider, createRealmContext, UserProvider } from '@realm/react';

import RemoteRealmConfig from './RemoteRealmConfig';

interface RemoteRealmContextInterface {
  useQuery: <T>(type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>)) => Realm.Results<T & Realm.Object<unknown, never>>
  useObject: <T>(type: string | (new (...args: any) => T), primaryKey: Realm.PrimaryKey) => (T & Realm.Object<T, never>) | null,
  useRealm: () => Realm,
  realm: Realm | null
}

type Props = {
  children?: JSX.Element | JSX.Element[],
};

const ContextWrapper = createContext<RemoteRealmContextInterface | null>(null);

const RealmContext = createRealmContext(RemoteRealmConfig());

export const RemoteRealmProvider = ({ children }: Props) => {
  const { RealmProvider, useQuery, useObject, useRealm } = RealmContext;

  const realmRef = useRef<Realm | null>(null);

  return (
    <ContextWrapper.Provider value={{
      useQuery,
      useObject,
      useRealm,
      realm: realmRef.current
    }} >
      <AppProvider id={appId}>
        <UserProvider fallback={LoginComponent}>
          {/* After login, user will be automatically populated in realm configuration */}
          <RealmProvider
            realmRef={realmRef}
            sync={{ partitionValue: 'SamplePartition' }}>
            {children}
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </ContextWrapper.Provider >
  );
}

export const useRemoteRealm = () => {
  const value = useContext(ContextWrapper);
  if (value == null) {
    throw new Error('useRemoteRealm() called outside of a RemoteRealmProvider?');
  }
  return value;
};