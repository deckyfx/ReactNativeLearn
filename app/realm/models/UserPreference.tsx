import Realm from "realm";

export const UserPreferenceKeys = Object.freeze({
  LOGIN_AS: "LOGIN_AS",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  LOGIN_TIME: "LOGIN_TIME",
  HAVE_SEE_INTRO: "HAVE_SEE_INTRO",
  HAVE_BUSINESS: "HAVE_BUSINESS",
  CURRENT_OUTLET: "CURRENT_OUTLET",
  CURRENT_POS_ID: "CURRENT_POS_ID",
  SIGNIN_AS: "SIGNIN_AS",
  SIGNIN_TIME: "SIGNIN_TIME",
  LANGUAGE: "LANGUAGE",
})

export enum PreferenceType {
  DOUBLE = 'double',
  NUMBER = 'number',
  STRING = 'string',
  JSON = 'json',
  ARRAY = 'array',
  BOOLEAN = 'boolean',
  DATE = 'date',
};

type UserPreferenceConstructor = {
  key: string;
  value: string;
  type: PreferenceType;
}

class UserPreference extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;
  lastUpdatedAt?: Date | null;

  key!: string;
  value!: string;
  type!: PreferenceType;
  // the Task.generate() method creates Task objects with fields with default values
  static generate({ key, value, type }: UserPreferenceConstructor | UserPreference) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      lastUpdatedAt: null,

      key,
      value,
      type,
    };
  }
  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'user_preference',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      key: 'string',
      value: 'string',
      type: 'string',
      createdAt: 'date',
      lastUpdatedAt: 'date?'
    },
  };

  getType() {
    return this.type;
  }

  private _getValue() {
    return this.value;
  }

  getValue() {
    switch (this.getType()) {
      case PreferenceType.STRING:
        return this._getValue();
      case PreferenceType.NUMBER:
        return Number(this._getValue()) || 0;
      case PreferenceType.DOUBLE:
        return Number(this._getValue()) || 0.0;
      case PreferenceType.BOOLEAN:
        return Boolean(1).toString() == this._getValue() || false;
      case PreferenceType.DATE:
        return new Date(Number(this._getValue()) || 0) || new Date();
      case PreferenceType.JSON:
        return JSON.parse(this._getValue()) || {};
      case PreferenceType.ARRAY:
        return JSON.parse(this._getValue()) || [];
    }
  }

  setValue(value: number | string | boolean | Date | Object, auto: boolean = false) {
    let type = UserPreference.inferTypeFromValue(value);
    let parsedvalue = UserPreference.parseValue(value);
    this.value = parsedvalue;
    if (auto) {
      this.type = type;
    }
    return this;
  }

  static inferTypeFromValue(value: number | string | boolean | Date | Object) {
    let type = PreferenceType.STRING;
    if (typeof value === 'string') {
      type = PreferenceType.STRING;
    } else if (typeof value === 'number') {
      type = PreferenceType.NUMBER;
    } else if (typeof value === 'boolean') {
      type = PreferenceType.BOOLEAN;
    } else if (typeof value === 'object') {
      if (value instanceof Date) {
        type = PreferenceType.DATE;
      } else if (Array.isArray(value)) {
        type = PreferenceType.ARRAY;
      } else {
        type = PreferenceType.JSON;
      }
    }
    return type;
  }

  static parseValue(value: number | string | boolean | Date | Object) {
    let type = UserPreference.inferTypeFromValue(value);
    let parsedvalue: string = ''
    switch (type) {
      case PreferenceType.STRING:
      case PreferenceType.NUMBER:
      case PreferenceType.BOOLEAN:
      case PreferenceType.STRING:
        parsedvalue = value.toString()
        break;
      case PreferenceType.DATE:
        parsedvalue = (value as Date).getTime().toString();
        break;
      case PreferenceType.ARRAY:
      case PreferenceType.JSON:
        parsedvalue = JSON.stringify(value);
        break;

    }
    return parsedvalue;
  }
}

export default UserPreference