/**
 * WEBHOOK WEBHOOK_END_POINTS LIST
 *
 * tambahkan endpoint lain dan kelompokkan berdasarkan grupnya
 *
 */

const FUNCTION_END_POINTS = {
  AUTH: {
    UPDATE_REALMID: 'clientUpdateRealmId',
  },
  GENERAL: {
    GET_USER_INFORMATION: 'clientUser',
    GET_EXPIRY_DATE: 'clientGetExpiry',
    GET_HELP_URL: 'clientHelpUrl',
  },
  CLIENT: {
    LAST_ONLINE: 'clientLastOnline',
    AVAILABLE_OUTLET_POSID: 'clientAvailableOutletPosid',
  },
  CLOUDINARY: {
    REMOVE: 'clientRemoveCloudinaryImage',
  },
};

Object.freeze(FUNCTION_END_POINTS);

export default FUNCTION_END_POINTS;
