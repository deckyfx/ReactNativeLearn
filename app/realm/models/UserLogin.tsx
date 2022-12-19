import Realm from "realm";

import UserLoginOutlet from "./UserLoginOutlet";

export type UserLoginConstructor = {
    access_token: string;
    business: boolean;
    fullname: string;
    license: string;
    outlets: UserLoginOutlet[];
    pin: boolean;
    realm_jwt: string;
    user_id: string;
}

class UserLogin extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    createdAt!: Date;
    lastUpdatedAt?: Date | null;

    access_token!: string;
    business!: boolean;
    fullname!: string;
    license!: string;
    outlets!: UserLoginOutlet[];
    pin!: boolean;
    realm_jwt!: string;
    user_id!: string;

    static generate({
        access_token,
        business,
        fullname,
        license,
        outlets,
        pin,
        realm_jwt,
        user_id,
    }: UserLoginConstructor | UserLogin) {
        return {
            _id: new Realm.BSON.ObjectId(),
            createdAt: new Date(),
            lastUpdatedAt: null,

            access_token,
            business,
            fullname,
            license,
            outlets,
            pin,
            realm_jwt,
            user_id,
        };
    }
    // To use a class as a Realm object type, define the object schema on the static property "schema".

    static schema = {
        name: 'user_login',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            createdAt: 'date',
            lastUpdatedAt: 'date?',

            access_token: 'string',
            business: 'bool',
            fullname: 'string',
            license: 'string',
            outlets: 'user_login_outlet[]',
            pin: 'bool',
            realm_jwt: 'string',
            user_id: 'string',
        },
    };
}

export default UserLogin