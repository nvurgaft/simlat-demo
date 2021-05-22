import DeviceMessage from '../models/device-message.js';
import HttpClient from '../services/http.js';

export default class DeviceMessagesService {

    static getMessagesForDevices(deviceIds) {
        return HttpClient.post('/messages/get-for-devices', deviceIds).then(
            (response) => {
                return response.data.map((obj) => {
                    return new DeviceMessage(obj.id, obj.deviceId, obj.type, obj.dateCreated, JSON.parse(obj.message));;
                });
            });
    }
}