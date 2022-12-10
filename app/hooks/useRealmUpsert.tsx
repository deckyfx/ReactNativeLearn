// Must be used in component inside RealmProvider

import { useCallback, useMemo } from 'react';

import Realm from 'realm';

const useRealmUpsert = (realm: Realm, schema: string, mode: Realm.UpdateMode.All | Realm.UpdateMode.Modified = Realm.UpdateMode.Modified) => {
    const write = useCallback(async (data: Unmanaged<unknown, never>) => {
        realm.write(() => {
            realm.create(schema, data, mode);
        });
    }, []);

    const remove = useCallback(async (data: Unmanaged<unknown, never>) => {
        realm.write(() => {
            realm.delete(data)
        });
    }, []);

    return [write, remove]
};

export default useRealmUpsert;
