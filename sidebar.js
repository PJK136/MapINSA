var filters = [
    {type: "Administratif", display: "Administratif", icon: "fa-toolbox"},
    {type: "Sport", display: "Terrains de sport", icon: "fa-toolbox"},
    {type: "Sante", display: "Santé", icon: "fa-toolbox"},
    {type: "Restaurants", display: "Restaurants", icon: "fa-toolbox"},
    {type: "VA", display: "Vie Associative", icon: "fa-toolbox"},
    {type: "Amphi", display: "Amphithéâtres", icon: "fa-toolbox"},
    {type: "Departement", display: "Départements", icon: "fa-toolbox"},
    {type: "Favoris", display: "Favoris", icon: "fa-toolbox"}
]


function showFilters()
{
    $("#sidebar").width("100%");
}

function hideFilters()
{
    $("#sidebar").width("0");
}

function addFilter(filterData)
{
    var filter = $(`
        <div class="d-flex mb-3">
            <span class="mr-auto"><i class="filter-icon fas fa-toolbox p-2 mr-2"></i><span class="filter-name"></span></span>
            <form class="form-inline">
                <div class="custom-control custom-checkbox my-1 mr-sm-2">
                    <input type="checkbox" class="filter-checkbox custom-control-input">
                    <label class="filter-checkbox-item custom-control-label">&nbsp;</label>
                </div>
            </form>
        </div>
    `);
    
    filter.find(".filter-name").text(filterData.display);
    filter.find(".filter-icon").addClass(filterData.icon);
    filter.find(".filter-checkbox").attr("id", "filter-"+filterData.type);
    filter.find(".filter-checkbox-item ").attr("for", "filter-"+filterData.type);
    $("#filterList").append(filter);
}

function addAllFilters()
{
    for (var i in filters)
        addFilter(filters[i]);
}

$(document).ready(() => addAllFilters());
