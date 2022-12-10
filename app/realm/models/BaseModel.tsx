import Realm from "realm";

class BaseModel extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    createdAt!: Date;
    lastUpdatedAt: Date | null = null;

    static generate() {
        return {
            _id: new Realm.BSON.ObjectId(),
            createdAt: new Date(),
        };
    }
}

export default BaseModel