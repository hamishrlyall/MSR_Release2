var cords = [145.03411259518066, -37.82879306920354];

// You gotta get your own Mapbox access token and style link now
mapboxgl.accessToken = "pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g";
var map = new mapboxgl.Map({
    container: 'map',
    style: "mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy", 
    center: JSON.parse(slideCoords[0]),
    zoom: 12.0
});

var canvas = map.getCanvasContainer();

var geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": JSON.parse(slideCoords[0])
            }
        }
    ]
};


//geojson.features.forEach(function (marker) {
//    // create a DOM element for the marker
//    var el = document.createElement('div');
//    el.className = 'marker';
//    el.style.width = '15px';
//    el.style.height = '15px';

//    el.addEventListener('click', function () {
//        window.alert(marker.properties.message);
//    });

//    // add marker to map
//    new mapboxgl.Marker(el)
//        .setLngLat(marker.geometry.coordinates)
//        .addTo(map);
//});

map.on('load', function () {
    map.addSource('point', {
        "type": "geojson",
        "data": geojson
    });

    map.loadImage('/assets/mappin.png', function (error, image) {
        if (error) throw error;
        map.addImage('pinImage', image);
        //map.addLayer({
        //    "id": "point",
        //    "type": "circle",
        //    "source": "point",
        //    "paint": {
        //        "circle-radius": 4,
        //        "circle-color": "#e24422"
        //    }
        //});

        map.addLayer({
            "id": "pin",
            "type": "symbol",
            "source": "point",
            "layout": {
                "icon-image": "pinImage",
                "icon-size": 0.20,
                "icon-offset" : [0,-100]
            }
        });
    });
});

const MapBox = {}
MapBox.initialiseMap = (container) => {
    mapboxgl.accessToken = "pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g";
    var map = new mapboxgl.Map({
        container: container,
        style: 'mapbox://styles/trigenpanini/cjl5yll0308l82qqktmirrjcy'
    });
    return map
}