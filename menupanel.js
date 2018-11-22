function showMenu()
{
    $("#menupanel").css("top", "33%");
}

function hideMenu()
{
    $("#menupanel").css("top", "100%");
}

function setMenuFav(fav)
{
    if (fav)
        $("#menu-favorite").removeClass("far").addClass("fas");
    else
        $("#menu-favorite").removeClass("fas").addClass("far");
}

function showPlaceInfo(place) {
    $("#menu-title").text(place.name);
    $("#menu-location").text("("+place.latlng.lat.toString().slice(0,10)+", "+place.latlng.lng.toString().slice(0,10)+")");
    setMenuFav(place.favorite);
    $("#menu-favorite").on("click", () => {
        setFavorite(place, !place.favorite);
        setMenuFav(place.favorite);
    });
    $("#menu-description").text(place.description);
    showMenu();
}

$(document).ready(() => {
    $("#menu-handle").on("click", hideMenu);
});
