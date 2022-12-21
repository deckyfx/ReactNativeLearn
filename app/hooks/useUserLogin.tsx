// Must be used in component inside RealmProvider

import { useCallback } from 'react';

import { useLocalRealm } from '../realm/local/LocalRealmContext';

import UserLogin, { UserLoginConstructor } from '../realm/models/UserLogin';

import useRealmQuery from './useRealmQuery';

import useRealmUpsert from './useRealmUpsert';

const useUserLogin = (): { value: UserLogin | null, update: (rawdata: UserLoginConstructor) => void, remove: () => void } => {
    const { useRealm, useQuery } = useLocalRealm();

    const userLogin = useRealmQuery<UserLogin>(useQuery, UserLogin);

    const realm = useRealm();

    const { write, upsert, remove: callRemove } = useRealmUpsert(realm, UserLogin.schema.name);

    const update = useCallback((rawdata: UserLoginConstructor) => {
        if (userLogin[0]) {
            write(() => {
                Object.keys(rawdata).forEach(key => {
                    (userLogin[0] as any)[key] = (rawdata as any)[key]
                })
            });
        } else {
            let newdata = UserLogin.generate(rawdata);
            upsert(newdata);
        }
    }, [userLogin])

    const remove = useCallback(() => {
        if (userLogin[0]) {
            return
        }
        callRemove(userLogin[0]);
    }, [userLogin])

    return { value: userLogin[0] || null, update, remove }
};

export default useUserLogin;
