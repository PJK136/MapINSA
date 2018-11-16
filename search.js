class Place{
    constructor(name,latlng, type){
        this.name = name;
        this.latlng = latlng;
        this.type = type;
    }
}

var places = [new Place("Service courrier", L.latLng(45.7834146,4.87807870000006), type)];

function search(request){

    places.forEach(element => {
        if(request == element.name){
            element.latlng.addTo(map);
            //break;
        }
    });

}