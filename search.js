var TypeEnum = Object.freeze({"Administratif":1,"Sport":2,"Sante":3,"Restaurants":4,"VA":5,"Amphi":6,"Departement":7});

class Place{
    constructor(name,latlng, type){
        this.name = name;
        this.latlng = latlng;
        this.type = type;
        this.favorite = true;
        this.marker = L.marker(latlng);
        this.marker.on("click",this.callback.bind(this));
    }

    callback(){
        getPlaceInfo(this);
    }
}

var places = [new Place("Service courrier", L.latLng(45.7834146,4.87807870000006),TypeEnum.Administratif),
    new Place("Direction",L.latLng(45.78332720254533,4.878197908401489),TypeEnum.Administratif),
    new Place("Département Informatique",L.latLng(45.78192708850882,4.872792647703136),TypeEnum.Departement),
    new Place("Département Génie Electrique",L.latLng(45.78294016834221,4.871694841686804), TypeEnum.Departement),
    new Place("Département FIMI",L.latLng(45.783969959961736,4.88181542071311), TypeEnum.Departement),
    new Place("Terrain de Volley Ball",L.latLng(45.784947033744814,4.881475567817688),TypeEnum.Sport),
    new Place("Association AEDI",L.latLng(45.78192708850882,4.872792647703136),TypeEnum.VA),
    new Place("Bureau des élèves",L.latLng(45.78408288023195,4.87468957901001),TypeEnum.VA),
    new Place("Infirmerie",L.latLng(45.78429427547835,4.879103081922608),TypeEnum.Sante),
    new Place("Beurk",L.latLng(45.78109003726761,4.873552322387695),TypeEnum.Restaurants),
    new Place("Amphithéatre Gaston Berger",L.latLng(45.78245928286134,4.872044920921326),TypeEnum.Amphi)];

function search(request){

    places.forEach(element => {
        if(request == element.name){
            element.marker.addTo(map);
        }
    });
}

function createLayer(typeName){

    var markers = [];
    places.forEach(element => {
        if(typeName == element.type){
            markers.push(element.marker);
        }
    });

   return L.layerGroup(markers);
}

function createFavLayer(){
    var markers = [];
    places.forEach(element => {
        if(element.favorite == true){
            markers.push(element.marker);
        }
    });

   return L.layerGroup(markers);
}

var administratif = createLayer(TypeEnum.Administratif);
var sport = createLayer(TypeEnum.Sport);
var sante = createLayer(TypeEnum.Sante);
var restaurants = createLayer(TypeEnum.Restaurants);
var va = createLayer(TypeEnum.VA);
var amphi = createLayer(TypeEnum.Amphi);
var departement = createLayer(TypeEnum.Departement);
var favorites = createFavLayer();

function displayLayer(typeName){
    switch(typeName){
        case TypeEnum.Administratif:
            administratif.addTo(map);
            break;
        case TypeEnum.Sport:
            sport.addTo(map);
            break;
        case TypeEnum.Sante:
            sante.addTo(map);
            break;
        case TypeEnum.Restaurants:
            restaurants.addTo(map);
            break;
        case TypeEnum.VA:
            va.addTo(map);
            break;
        case TypeEnum.Amphi:
            amphi.addTo(map);
            break;
        case TypeEnum.Departement:
            departement.addTo(map);
            break;
        default :
            if(typeName = "favorite"){
                favorites.addTo(map);
            }
            break;
    }

}

function hideLayer(typeName){
    switch(typeName){
        case TypeEnum.Administratif:
            map.removeLayer(administratif);
            break;
        case TypeEnum.Sport:
            map.removeLayer(sport);
            break;
        case TypeEnum.Sante:
            map.removeLayer(sante);
            break;
        case TypeEnum.Restaurants:
            map.removeLayer(restaurants);
            break;
        case TypeEnum.VA:
            map.removeLayer(va);
            break;
        case TypeEnum.Amphi:
            map.removeLayer(amphi);
            break;
        case TypeEnum.Departement:
            map.removeLayer(departement);
            break;
        default :
            if(typeName == "favorite"){
                map.removeLayer(favorites);
            }
            break;
    }
}
