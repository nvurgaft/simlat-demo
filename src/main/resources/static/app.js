// window.onload = function () { }
import DeviceService from './services/devices.service.js';
import DeviceMessagesService from './services/device-messages.service.js';

const app = Vue.createApp({
    mounted() {
        // setup map
        let myMap = L.map('map-id').setView([51.505, -0.09], 13);
        myMap.setView([40.3600019617025, -111.89497947692871], 12);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(myMap);

        // get devices data
        // DeviceService.getMockDevices().then(
        DeviceService.getDevices().then(
            (devices) => {
                let allDevicesIds = devices.map((d) => d.id);
                DeviceMessagesService.getMessagesForDevices(allDevicesIds).then(
                    (messages) => {
                        messages.forEach((message) => {
                            devices.forEach((device) => {
                                if (message.deviceId === device.id) {
                                    switch (message.type) {
                                        case 'DeviceGlobalPosition':
                                            device.positionHistory.push(message);
                                            break;
                                        case 'DeviceStatus':
                                            device.statusHistory.push(message);
                                            break;
                                        default:
                                        // Do something maybe ?!
                                    }
                                }
                            });
                        });

                        // Add device marker to map
                        this.markers = devices.map((device) => {
                            // Create
                            let marker = new L.Marker(myMap.getCenter())
                            // Label
                            marker.bindTooltip(device.name, {
                                permanent: true,
                                direction: 'right'
                            });
                            // Set marker location - takes [latitude, longitude]
                            let ls = device.getLatestCoordinates();
                            marker.setLatLng([ls.lat, ls.lon]);
                            marker.addTo(myMap);
                            marker.on('click', e => vm.showDeviceStatus(device));
                            // Add
                            return marker;
                        });
                    });


            },
            (error) => {
                console.error("Failed fetching devices: ", error);
            });
    },
    unmount() {
        this.markers.forEach(marker => {
            marker.off('click');
        });
    },
    data() {
        return {
            position: null,
            status: null
        }
    },
    methods: {
        showDeviceStatus(device) {
            this.title = device.name;
            this.position = device.getLatestCoordinates();
            this.status = device.getLatestStatus();
        }
    }
});

app.component('app-sidebar', {
    props: ['title', 'position', 'status'],
    template: `
        <h3>{{title}}</h3>
        <hr/>
        <div class="card mb-2" v-if="position">
            <div class="card-header">
                Device Position
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Latitude: {{position.lat}}</li>
                <li class="list-group-item">Longitude: {{position.lon}}</li>
            </ul>
        </div>

        <div class="card mb-2" v-if="status">
            <div class="card-header">
                Device Status
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Estimated remaining time: {{status.estimatedRemainingTime}} seconds</li>
                <li class="list-group-item">Battery: {{status.batteryPercentage}}%</li>
            </ul>
        </div>
    `
});

app.component('app-content', {
    props: [],
    template: `<div id="map-id"></div>`
});

const vm = app.mount('#app')

