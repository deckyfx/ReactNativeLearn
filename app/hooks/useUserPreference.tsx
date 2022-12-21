// Must be used in component inside RealmProvider

import { useCallback } from 'react';

import { useLocalRealm } from '../realm/local/LocalRealmContext';

import UserPreference from '../realm/models/UserPreference';

import useRealmQuery from './useRealmQuery';
import useRealmUpsert from './useRealmUpsert';

const useUserPreference = (key: string): { value: UserPreference | null, update: (value: number | string | boolean | Date | Object) => void, remove: () => void } => {
    const { useRealm, useQuery } = useLocalRealm();

    const preference = useRealmQuery<UserPreference>(useQuery, UserPreference, (pref) => {
        return pref.key === key
    })

    const realm = useRealm();

    const {write, upsert, remove: callRemove} = useRealmUpsert(realm, UserPreference.schema.name);

    const update = useCallback((value: number | string | boolean | Date | Object) => {
        if (preference[0]) {
            write(() => {
                preference[0].setValue(value, true);
            })
        } else {
            let newpreference = UserPreference.generate({
                key,
                value: UserPreference.parseValue(value),
                type: UserPreference.inferTypeFromValue(value)
            });
            upsert(newpreference);
        }
    }, [preference])

    const remove = useCallback(() => {
        if (preference[0]) {
            return
        }
        callRemove(preference[0]);
    }, [preference])

    return { value: preference[0] || null, update, remove }
};

export default useUserPreference;
