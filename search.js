var TypeEnum = Object.freeze({"Administratif":1,"Sport":2,"Sante":3,"Restaurants":4,"VA":5,"Amphi":6,"Departement":7});

class Place{
    constructor(name,latlng, type){
        this.name = name;
        this.latlng = latlng;
        this.type = type;
    }
}

var places = [new Place("Service courrier", L.latLng(45.7834146,4.87807870000006),TypeEnum.Administratif)];

function search(request){

    places.forEach(element => {
        if(request == element.name){
            L.marker(element.latlng).addTo(map);
        }
    });
}

function createLayer(typeName){

    var markers = [];
    places.forEach(element => {
        if(typeName == element.type){
            markers.push(L.marker(element.latlng));
        }
    });

   return L.layerGroup(markers);
}

var administartif = createLayer(TypeEnum.Administratif);


function displayLayer(typeName){
    switch(typeName){
        case TypeEnum.Administratif:
            administartif.addTo(map);
            break;
        case TypeEnum.Amphi:
            administartif.addTo(map);
            break;
    }
}

function hideLayer(typeName){
    switch(typeName){
        case TypeEnum.Administratif:
            map.removeLayer(administartif);
            break;
        case TypeEnum.Amphi:
            administartif.removeTo(map);
            break;
    }
}
displayLayer(TypeEnum.Administratif);
setTimeout(function(){
    hideLayer(TypeEnum.Administratif);
},2000);