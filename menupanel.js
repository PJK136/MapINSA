function showMenu()
{
    $("#menupanel").css("top", "25%");
}

function hideMenu()
{
    $("#menupanel").css("top", "100%");
}

function showPlaceInfo(place) {
    $("#menu-title").text(place.name);
    $("#menu-location").text("("+place.latlng.lat+", "+place.latlng.lng+")");
    showMenu();
}
