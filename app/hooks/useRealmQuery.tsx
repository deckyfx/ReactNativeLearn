// Must be used in component inside RealmProvider

import { useMemo } from 'react';

import Realm from 'realm';

type UseQueryFirstArg<T> = <T>(type: string | ((new (...args: any) => T) & Realm.ObjectClass<any>)) => Realm.Results<T & Realm.Object<unknown, never>>;

type UseQuerySecondArg<T> = string | ((new (...args: any) => T) & Realm.ObjectClass<any>);

type UseQueryThirdArg<T> = ((_each: T) => boolean) | undefined;

const useRealmQuery = <T extends Realm.Object<any, never>>(useQuery: UseQueryFirstArg<T>, model: UseQuerySecondArg<T>, queryFunction: UseQueryThirdArg<T> = undefined) => {
    const data = useQuery(model);

    const result = useMemo(() => {
        return queryFunction ? data.filter(queryFunction) : data
    }, [data]);

    return result
};

export default useRealmQuery;