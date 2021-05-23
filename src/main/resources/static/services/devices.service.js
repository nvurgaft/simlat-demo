import Device from '../models/device.js';
import HttpClient from '../services/http.js';

export default class DeviceService {

    static getDevices() {
        return HttpClient.get(`/devices/get-all`).then(
            (response) => {
                return response.data.map((device) => {
                    return new Device(device.id, device.name);
                });
            }
        )
    }
}