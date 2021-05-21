
export default class Device {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    setGlobalPosition(timestamp, lat, lon, alt, heading) {
        this.globalPosition = {
            timestamp: timestamp,
            lat: lat,
            lon: lon,
            alt: alt,
            heading: heading
        }
    }

    setDeviceStatus(timestamp, estimatedRemainingTime, batteryPercentage) {
        this.deviceStatus = {
            timestamp: timestamp,
            estimatedRemainingTime: estimatedRemainingTime,
            batteryPercentage: batteryPercentage
        }
    }

    /**
     * Returns the position 
     * @returns An position array in the shape of [latitude, longitude] that Leaflet could accept
     */
    getCoordinates() {
        if (this.globalPosition) {
            return [
                this.globalPosition.lat,
                this.globalPosition.lon,
            ]
        }
    }
}