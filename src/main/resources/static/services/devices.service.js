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

    // static getMockDevices() {
    //     return new Promise((resolve) => {

    //         let d1 = new Device(1, "Ludwig");
    //         d1.setGlobalPosition(Date.now(), 40.3601491164367, -111.89167499542236, 0, 70);
    //         d1.setDeviceStatus(Date.now(), 60 * 60 * 1000, 78);

    //         let d2 = new Device(2, "Friedrich");
    //         d2.setGlobalPosition(Date.now(), 40.3701491164367, -111.92167499542236, 0, 70);
    //         d2.setDeviceStatus(Date.now(), 112 * 60 * 1000, 62);

    //         return resolve([d1, d2]);
    //     });
    // }
}