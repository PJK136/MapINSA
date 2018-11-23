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
        new Place("Sport","Piscine",45.783892, 4.877760,"swimming-pool",""),
        new Place("Sport","Gymnase C",45.784079, 4.877570,"running",""),
        new Place("Sport","Gymnase B",45.785543, 4.883402,"running",""),
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
 new Place("Restaurant","Le Prévert",45.781171, 4.873251,"utensils",
`Lundi : 11h30-13h30/18h00-20h00
Mardi : 11h30-13h30/18h00-20h00
Mercredi : 11h30-13h30/18h00-20h00
Jeudi : 11h30-13h30/18h00-20h00
Vendredi : 11h30-13h30/18h00-20h00
Samedi : Fermé
Dimanche : Fermé`),
        new Place("Restaurant","L'Olivier",45.784245, 4.874808,"utensils",
`Lundi : 11h45-13h30
Mardi : 11h45-13h30
Mercredi : 11h45-13h30
Jeudi : 11h45-13h30
Vendredi : 11h45-13h30
Samedi : Fermé
Dimanche : Fermé`),
        new Place("Restaurant","Le Grillon",45.783938, 4.875046,"utensils",
`Lundi : 11h45-13h30
Mardi : 11h45-13h30
Mercredi : 11h45-13h30
Jeudi : 11h45-13h30
Vendredi : 11h45-13h30
Samedi : Fermé
Dimanche : Fermé`),
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
        new Place("VA","InSecurity",45.783548, 4.872670,"user-graduate",`InSecurity est une association Insalienne qui a pour but de promouvoir auprès des étudiants, la sécurité des systèmes d'information.

Ouvert à tous, débutants et confirmés !

Horaires des séances : jeudi de 14h à 17h
`),
        new Place("VA","Club Rock",45.784092, 4.871504,"user-graduate",`Le club rock propose aux élèves de l'INSA des cours de rock à six temps. Trois niveaux sont possibles: débutant, ex-débutant et avancé. Nous proposons aussi un cours débutant de West Coast Swing pour faire découvrir aux étudiants cette danse de couple qui est à la fois proche du rock et assez différente dans les sensations.

Horaires :
Rock débutant : lundi 18:15-19:30 ou mardi 19:15-20:30
Rock intermédiaire : lundi 19:30-20:30
Rock avancé : lundi 20:30-21:30
West Coast Swing débutant: mardi 20:30-21:30
West Cast Swing avancé: mardi 21:30-22:30`),
        new Place("VA","La Rotonde",45.783845, 4.874090,"user-graduate",""),
    ],
    "Amphi": [
        new Place("Amphi","Amphithéâtre Gaston Berger",45.78245928286134,4.872044920921326,"landmark"),
        new Place("Amphi","Amphithéâtre Marc Seguin",45.782382, 4.875729,"landmark"),
        new Place("Amphi","Amphithéâtre André Lespinasse",45.782438, 4.873869,"landmark"),
        new Place("Amphi","Amphithéâtre Jean Capelle",45.783524, 4.880892,"landmark"),
    ],
    "Departement": [
        new Place("Departement","Département Informatique",45.78192708850882,4.872792647703136,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : Fermé
Dimanche : Fermé`),
        new Place("Departement","Département Génie Electrique",45.78294016834221,4.871694841686804,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : Fermé
Dimanche : Fermé`),
        new Place("Departement","Département FIMI",45.783969959961736,4.88181542071311,"graduation-cap",
`Lundi : 7h00-20h00
Mardi : 7h00-20h00
Mercredi : 7h00-20h00
Jeudi : 7h00-20h00
Vendredi : 7h00-20h00
Samedi : Fermé
Dimanche : Fermé`),
    ],
    "Favori": [
    ]
};

function search(request){
    hideMenu();
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
