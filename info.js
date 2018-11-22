function getPlaceInfo(place){
    alert(place.name);
    //use the place object to display informations

    //add place to favorites
    setFavorite(place,true);

    //remove place from favorite
    setFavorite(place,false);
}
