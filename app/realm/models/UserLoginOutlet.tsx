import Realm from "realm";

import UserLoginPOSID from "./UserLoginPOSID";

type UserLoginOutletConstructor = {
    address: string;
    business_id: string;
    business_name: string;
    city: string;
    country_code: string;
    name: string;
    posIds: UserLoginPOSID[];
    postalCode: string;
    province: string;
}

class UserLoginOutlet extends Realm.Object {
    address!: string;
    business_id!: string;
    business_name!: string;
    city!: string;
    country_code!: string;
    name!: string;
    posIds!: UserLoginPOSID[];
    postalCode!: string;
    province!: string;
    // the Task.generate() method creates Task objects with fields with default values
    static generate({ 
        address,
        business_id,
        business_name,
        city,
        country_code,
        name,
        posIds,
        postalCode,
        province,
    }: UserLoginOutletConstructor | UserLoginOutlet) {
        return {
            address,
            business_id,
            business_name,
            city,
            country_code,
            name,
            posIds,
            postalCode,
            province,
        };
    }
    // To use a class as a Realm object type, define the object schema on the static property "schema".
    static schema = {
        name: 'user_login_outlet',
        embedded: true,
        properties: {
            address: 'string',
            business_id: 'string',
            business_name: 'string',
            city: 'string',
            country_code: 'string',
            name: 'string',
            posIds: 'user_login_posid[]',
            postalCode: 'string',
            province: 'string',
        },
    };
}

export default UserLoginOutlet