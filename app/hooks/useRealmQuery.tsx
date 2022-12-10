// Must be used in component inside RealmProvider

import { useMemo } from 'react';

import Realm from 'realm';

const useRealmQuery = <T extends Realm.Object<any, never>>(useQuery: <T>(type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>)) => Realm.Results<T & Realm.Object<unknown, never>>, model: string | ((new (...args: any) => T) & Realm.ObjectClass<any>), queryFunction: (_each: T) => boolean) => {
    const data = useQuery(model);

    const result = useMemo(() => {
        return data.filter(queryFunction)
    }, [data]);

    return result
};

export default useRealmQuery;