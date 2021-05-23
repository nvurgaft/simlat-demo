// window.onload = function () { }
import DeviceService from './services/devices.service.js';
import DeviceMessagesService from './services/device-messages.service.js';

const app = Vue.createApp({
    mounted() {
        let self = this;

        // setup map
        let mainMap = L.map('map-id').setView([51.505, -0.09], 13);
        mainMap.setView([40.3600019617025, -111.89497947692871], 12);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18
        }).addTo(mainMap);

        mainMap.on('click', e => {
            this.navToggled = true;
            self.markers.forEach((m) => {
                m.setIcon(blueMarker);
            })
        });

        // define markers
        const [blueMarker, purpleMarker] = ['marker-icon.png', 'marker2-icon.png'].map((filename) => {
            return L.icon({
                iconUrl: `vendor/leaflet/images/${filename}`,
                shadowUrl: 'vendor/leaflet/images/marker-shadow.png',

                iconSize: [24, 42], // size of the icon
                shadowSize: [41, 41], // size of the shadow
                iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
                shadowAnchor: [4, 41],  // the same for the shadow
                // popupAnchor:  [3, 20] // point from which the popup should open relative to the iconAnchor
            });
        });

        // get devices data
        // DeviceService.getMockDevices().then(
        DeviceService.getDevices().then((devices) => {
            let allDevicesIds = devices.map((d) => d.id);
            DeviceMessagesService.getMessagesForDevices(allDevicesIds).then((messages) => {
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

                // Add device markers to map
                self.markers = devices.map((device) => {
                    // Create
                    let marker = new L.Marker(mainMap.getCenter())
                    // Label
                    marker.bindTooltip(device.name, {
                        permanent: true,
                        direction: 'right'
                    });
                    // Set marker location - takes [latitude, longitude]
                    let ls = device.getLatestCoordinates();
                    marker.setLatLng([ls.lat, ls.lon]);
                    marker.addTo(mainMap);
                    marker.on('click', e => {
                        vm.showDeviceStatus(device);
                        self.markers.forEach((m) => {
                            m.setIcon(blueMarker);
                        })
                        marker.setIcon(purpleMarker);
                    });
                    // Add
                    return marker;
                });
            });
        }, (error) => {
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
            navToggled: true,
            showModal: false,
            title: "None",
            position: null,
            status: null
        }
    },
    methods: {
        toggleNavbar(event) {
            this.navToggled = !this.navToggled;
        },
        setModalOpen(show, event) {
            console.debug("event: ", event);
            event && event.preventDefault();
            this.showModal = show;
        },
        showDeviceStatus(device) {
            this.title = device.name;
            this.position = device.getLatestCoordinates();
            this.status = device.getLatestStatus();
            this.navToggled = false;
        }
    }
});

app.component('app-sidebar', {
    props: ['title', 'position', 'status'],
    template: '#app-sidebar-template',
    computed: {
        remainingTimeMinutes() {
            return this.status.estimatedRemainingTime / 60
        }
    }
});

app.component('app-content', {
    props: [],
    template: `<div id="map-id"></div>`
});

const vm = app.mount('#app')

