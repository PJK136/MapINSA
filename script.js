var map = L.map('map',{
    center: [45.784130265610656,4.876399709901307],
    zoom : 16,
    zoomControl : false
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    id:'mapbox.light',attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var lc = L.control.locate({
    position: "bottomright",
    clickBehavior: {
        inView: 'setView',
        outOfView: 'setView',
        inViewNotFollowing: 'setView'
    }
});
lc.addTo(map);
lc.start();
