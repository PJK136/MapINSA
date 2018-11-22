function typeToColor(typeName)
{
    return "blue";
    
    switch (typeName) {
        case "Administratif": return "orange";
        case "Sport": return "darkblue";
        case "Sante": return "red";
        case "Restaurant": return "green";
        case "VA": return "darkblue";
        case "Amphi": return "blue";
        case "Departement": return "blue";
        case "Favori": return "purple";
    }
}

function toIcon(icon, color)
{
    var markerInfo = {
        prefix: "fa",
        icon: icon,
        markerColor: color,
    };
    
    return L.AwesomeMarkers.icon(markerInfo);
}

class Place {
    constructor(type, name, latlng, icon) {
        this.type = type;
        this.name = name;
        this.latlng = latlng;
        this.favorite = false;
        this.marker = L.marker(latlng, {icon: toIcon(icon, typeToColor(type))});
        this.marker.on("click",this.callback.bind(this));
    }

    callback(){
        getPlaceInfo(this);
    }
}

var places = {
    "Administratif": [
        new Place("Administratif","Service courrier", L.latLng(45.7834146,4.87807870000006),"envelope"),
        new Place("Administratif","Direction",L.latLng(45.78332720254533,4.878197908401489),"building"),
    ],
    "Sport": [
        new Place("Sport","Terrain de Volley Ball",L.latLng(45.784947033744814,4.881475567817688),"volleyball-ball"),
    ],
    "Sante": [
        new Place("Sante","Infirmerie",L.latLng(45.78429427547835,4.879103081922608),"notes-medical"),
    ],
    "Restaurant": [
        new Place("Restaurant","Beurk",L.latLng(45.78109003726761,4.873552322387695),"utensils"),
    ],
    "VA": [
        new Place("VA","Association AEDI",L.latLng(45.78192708850882,4.872792647703136),"user-graduate"),
        new Place("VA","Bureau des élèves",L.latLng(45.78408288023195,4.87468957901001),"user-graduate"),
    ],
    "Amphi": [
        new Place("Amphi","Amphithéatre Gaston Berger",L.latLng(45.78245928286134,4.872044920921326),"landmark"),
    ],
    "Departement": [
        new Place("Departement","Département Informatique",L.latLng(45.78192708850882,4.872792647703136),"graduation-cap"),
        new Place("Departement","Département Génie Electrique",L.latLng(45.78294016834221,4.871694841686804),"graduation-cap"),
        new Place("Departement","Département FIMI",L.latLng(45.783969959961736,4.88181542071311),"graduation-cap"),
    ],
    "Favori": [
    ]
};

function search(request){

    for (var typeName in places)
    {
        places[typeName].forEach(element => {
            if(request == element.name){
                element.marker.addTo(map);
            }
        });
    }
}

function createLayer(typeName){

    var markers = [];
    places[typeName].forEach(place => {
        markers.push(place.marker);
    });

   return L.layerGroup(markers);
}

function createFavLayer(){
    var markers = [];
    
    for (var typeName in places)
    {
        places[typeName].forEach(place => {
            if (place.favorite)
                markers.push(place.marker);
        });
    }
    return L.layerGroup(markers);
}

var layers = [];

for (var typeName in places)
{
    layers[typeName] = createLayer(typeName);
}

layers["Favoris"] = createFavLayer();

function displayLayer(typeName){
    layers[typeName].addTo(map);
}

function hideLayer(typeName){
    map.removeLayer(layers[typeName]);
}

function setFavorite(place,mode){
    place.favorite = mode;
    favorites = createFavLayer();
}
