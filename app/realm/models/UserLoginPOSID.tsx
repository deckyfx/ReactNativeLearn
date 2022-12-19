import Realm from "realm";

type UserLoginPOSIDConstructor = {
    expired: Date | string;
    isExp: boolean;
    name: string;
}

class UserLoginPOSID extends Realm.Object {
    expired!: Date;
    isExp!: boolean;
    name!: string;

    static generate({
        expired,
        isExp,
        name,
    }: UserLoginPOSIDConstructor | UserLoginPOSID) {
        return {
            expired: new Date(expired),
            isExp,
            name,
        };
    }
    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
        name: 'user_login_posid',
        embedded: true,
        properties: {
            expired: 'date',
            isExp: 'bool',
            name: 'string'
        },
    };
}

export default UserLoginPOSID