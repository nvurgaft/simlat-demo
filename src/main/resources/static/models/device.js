
export default class Device {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.positionHistory = [];
        this.statusHistory = [];
    }

    // setGlobalPosition(timestamp, lat, lon, alt, heading) {
    //     this.globalPosition = {
    //         timestamp: timestamp,
    //         lat: lat,
    //         lon: lon,
    //         alt: alt,
    //         heading: heading
    //     }
    // }

    // setDeviceStatus(timestamp, estimatedRemainingTime, batteryPercentage) {
    //     this.deviceStatus = {
    //         timestamp: timestamp,
    //         estimatedRemainingTime: estimatedRemainingTime,
    //         batteryPercentage: batteryPercentage
    //     }
    // }

    /**
     * Returns the position 
     * @returns An position array in the shape of [latitude, longitude] that Leaflet could accept
     */
    getLatestCoordinates() {
        let glob_pos = this.positionHistory.sort(function (item1, item2) {
            return item1.dateCreated - item2.dateCreated;
        })[0];
        if (glob_pos) {
            return glob_pos.message ? glob_pos.message.data : {};
        }
    }
    
    getLatestStatus() {
        let glob_pos = this.statusHistory.sort(function (item1, item2) {
            return item1.dateCreated - item2.dateCreated;
        })[0];
        if (glob_pos) {
            return glob_pos.message ? glob_pos.message.data : {};
        }
    }
}