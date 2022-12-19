

let payload = {
    username: getFormDataEmail(),
    password: getFormDataPassword(),
    serialNumber: await DeviceInfo.getUniqueId(), // On Android it is currently identical to getAndroidId(). On iOS it uses the DeviceUID uid identifier.
    imei: '', // IMEI is deprecated
};