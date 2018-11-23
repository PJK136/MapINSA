function typeToColor(typeName)
{
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
    constructor(type, name, lat, lng, icon, description) {
        this.type = type;
        this.name = name;
        this.latlng = L.latLng(lat, lng);
        this.favorite = false;
        this.marker = L.marker(this.latlng, {icon: toIcon(icon, typeToColor(type))});
        this.marker.on("click",this.callback.bind(this));
        this.description = description;
    }

    callback(){
        showPlaceInfo(this);
    }
}

var places = {
    "Administratif": [
        new Place("Administratif","Service courrier", 45.7834146,4.87807870000006,"envelope",
`Lundi : 10h00-16h30
Mardi : 10h00-11h45/13h30-16h30
Mercredi : 10h00-11h45/13h30-16h30
Jeudi : 10h00-11h45/13h30-16h30
Vendredi : 10h00-16h30
Samedi : Fermé
Dimanche : Fermé`),
        new Place("Administratif","Direction",45.78332720254533,4.878197908401489,"building",
`Lundi : 10h00-16h30
Mardi : 10h00-11h45/13h30-16h30
Mercredi : 10h00-11h45/13h30-16h30
Jeudi : 10h00-11h45/13h30-16h30
Vendredi : 10h00-16h30
Samedi : Fermé
Dimanche : Fermé`),
    ],
    "Sport": [
        new Place("Sport","Terrain de Volley Ball",45.784947033744814,4.881475567817688,"volleyball-ball",`Besoin de l'accord du centre des sports pour entrer`),
    ],
    "Sante": [
        new Place("Sante","Infirmerie",45.78429427547835,4.879103081922608,"notes-medical",
`Lundi : 7h30-18h00
Mardi : 7h30-18h00
Mercredi : 7h30-18h00
Jeudi : 7h30-18h00
Vendredi : 7h30-18h00
Samedi : Fermé
Dimanche : Fermé`),
    ],
    "Restaurant": [
        new Place("Restaurant","Restaurant INSA",45.78109003726761,4.873552322387695,"utensils",
`Lundi : 11h30-13h30/18h00-20h00
Mardi : 11h30-13h30/18h00-20h00
Mercredi : 11h30-13h30/18h00-20h00
Jeudi : 11h30-13h30/18h00-20h00
Vendredi : 11h30-13h30/18h00-20h00
Samedi : 12h00-13h30
Dimanche : 12h00-13h30/18h00-20h00`),
    ],
    "VA": [
        new Place("VA","Association AEDI",45.78192708850882,4.872792647703136,"user-graduate",
`Lundi : 10h00-14h30/15h30-19h00
Mardi : 10h00-14h30/15h30-19h00
Mercredi : 10h00-14h30/15h30-19h00
Jeudi : 10h00-18h00
Vendredi : 10h00-14h00
Samedi : 12h00-13h30
Dimanche : 12h00-13h30/18h00-20h00`),
        new Place("VA","Bureau des élèves",45.78408288023195,4.87468957901001,"user-graduate",
`Lundi : 10h00-14h30/15h30-19h00
Mardi : 10h00-14h30/15h30-19h00
Mercredi : 10h00-14h30/15h30-19h00
Jeudi : 10h00-18h00
Vendredi : 10h00-14h00
Samedi : 12h00-13h30
Dimanche : 12h00-13h30/18h00-20h00`),
        new Place("VA","INSAlgo",45.781804,4.872876,"user-graduate","De l'algo et de la Pizza"),
    ],
    "Amphi": [
        new Place("Amphi","Amphithéatre Gaston Berger",45.78245928286134,4.872044920921326,"landmark"),
    ],
    "Departement": [
        new Place("Departement","Département Informatique",45.78192708850882,4.872792647703136,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : 7h00-20h00
Dimanche : 7h00-20h00`),
        new Place("Departement","Département Génie Electrique",45.78294016834221,4.871694841686804,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : 7h00-20h00
Dimanche : 7h00-20h00`),
        new Place("Departement","Département FIMI",45.783969959961736,4.88181542071311,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : 7h00-20h00
Dimanche : 7h00-20h00`),
    ],
    "Favori": [
    ]
};

function search(request){
    layers["Search"].clearLayers();
    refreshLayers();
    
    var latLngs = [];
    for (var typeName in places)
    {
        places[typeName].forEach(element => {
            if(element.name.toLowerCase().includes(request.toLowerCase())){
                layers["Search"].addLayer(element.marker);
                latLngs.push(element.marker.getLatLng());
            }
        });
    }
    
    if (latLngs.length > 0)
    {
        var markerBounds = L.latLngBounds(latLngs);
        map.fitBounds(markerBounds);
    }
}

function createLayerGroup(typeName){

    var markers = [];
    places[typeName].forEach(place => {
        markers.push(place.marker);
    });

   return L.layerGroup(markers);
}

var layers = [];

for (var typeName in places)
{
    layers[typeName] = createLayerGroup(typeName);
}

layers["Favori"] = L.layerGroup();
layers["Search"] = L.layerGroup();
layers["Search"].addTo(map);

function displayLayer(typeName){
    layers[typeName].addTo(map);
}

function hideLayer(typeName){
    map.removeLayer(layers[typeName]);
    refreshLayers();
}

function setFavorite(place,mode){
    place.favorite = mode;
    if (place.favorite)
        layers["Favori"].addLayer(place.marker);
    else
    {
        layers["Favori"].removeLayer(place.marker);
        refreshLayers();
    }
}

function refreshLayers()
{
    for (var typeName in layers)
    {
        if (map.hasLayer(layers[typeName]))
        {
            map.removeLayer(layers[typeName]);
            layers[typeName].addTo(map);
        }
    }
}

$(document).ready(() => {
    $("#search-form").submit(function(event) {
        event.preventDefault();
        search($("#search-place").val());
    });
    
    for (var typeName in places)
    {
        places[typeName].forEach(element => {
            var option = $("<option>");
            option.text(element.name);
            $("#places").append(option);
        });
    }
});
