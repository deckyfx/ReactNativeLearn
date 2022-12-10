import UserPreference from "../models/UserPreference"

const RemoteRealmConfig = () => {
    return {
        schema: [UserPreference],
        schemaVersion: 0,
        path: 'local.realm',
    }
}


export default RemoteRealmConfig