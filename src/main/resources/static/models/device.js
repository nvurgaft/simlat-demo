
export default class Device {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.positionHistory = [];
        this.statusHistory = [];
    }

    /**
     * Returns the position 
     * @returns An position array in the shape of [latitude, longitude] that Leaflet could accept
     */
    getLatestCoordinates() {
        let glob_pos = this.positionHistory.sort(function (item1, item2) {
            return item2.dateCreated - item1.dateCreated;
        })[0];
        if (glob_pos) {
            return glob_pos.message ? glob_pos.message.data : {};
        }
    }
    
    getLatestStatus() {
        let glob_pos = this.statusHistory.sort(function (item1, item2) {
            return item2.dateCreated - item1.dateCreated;
        })[0];
        if (glob_pos) {
            return glob_pos.message ? glob_pos.message.data : {};
        }
    }
}