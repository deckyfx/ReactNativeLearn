import UserPreference from "../models/UserPreference"

const LocalRealmConfig = () => {
    return {
        schema: [UserPreference],
        schemaVersion: 0,
        path: 'local.realm',
    }
}


export default LocalRealmConfig