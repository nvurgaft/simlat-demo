import DeviceMessage from '../models/device-message.js';
import HttpClient from '../services/http.js';

export default class DeviceMessagesService {

    static getMessagesForDevice(deviceId) {
        // get-for-device
        return HttpClient.get('/messages/get-for-device', {
            params: {
                id: deviceId
            }
        }).then((response) => response.data)
    }
}