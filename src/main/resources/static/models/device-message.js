export default class DeviceMessage {
    constructor(id, deviceId, type, dateCreated, message) {
        this.id = id;
        this.deviceId = deviceId;
        this.type = type;
        this.dateCreated = dateCreated;
        this.message = message;
    }
}