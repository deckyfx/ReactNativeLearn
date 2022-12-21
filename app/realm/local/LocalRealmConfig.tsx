import UserLogin from "../models/UserLogin"
import UserLoginOutlet from "../models/UserLoginOutlet"
import UserLoginPOSID from "../models/UserLoginPOSID"

import UserPreference from "../models/UserPreference"

const LocalRealmConfig = () => {
    return {
        schema: [
            UserPreference,
            UserLogin,
            UserLoginOutlet,
            UserLoginPOSID
        ],
        schemaVersion: 0,
        path: 'local.realm',
    }
}


export default LocalRealmConfig