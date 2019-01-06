$('#msr_tab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

$('#aif_tab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})


//Portfolios
var msr_portfolios = []
$('#msr-list tbody tr').each((index, value) => {

    var coords = value.children[2].attributes['data-coords']

    if (coords != null)
    msr_portfolios.push({
        media_source: value.attributes['data-media_source'].nodeValue,
        regimentNo: value.children[0].innerHTML,
        name: value.children[1].firstChild.innerHTML,
        address: value.children[2].innerHTML,
        battalion: value.children[3].innerHTML,
        coords: JSON.parse(coords.nodeValue),//.reverse(),
        href: value.children[1].firstChild.attributes['href'].nodeValue
    })
})

var aif_portfolios = []
$('#aif-list tbody tr').each((index, value) => {

    var coords = value.children[2].attributes['data-coords']

    if (coords != null)
    aif_portfolios.push({
        coords: JSON.parse(coords.nodeValue),//.reverse(),
        regimentNo: value.children[0].innerHTML,
        name: value.children[1].firstChild.innerHTML,
        address: value.children[2].innerHTML,
        battalion: value.children[3].innerHTML,
        href: value.children[1].firstChild.attributes['href'].nodeValue
    })
})

//Initialise Maps
var MSR_Map = L.map('msrmap').setView([-28, 133], 4);
var AIF_Map = L.map('aifmap').setView([-28, 133], 4);

var tilecode = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g'
var attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
var tileid = 'mapbox.streets'
var accessToken = 'pk.eyJ1IjoidHJpZ2VucGFuaW5pIiwiYSI6ImNqbDV0NXU3NjJxZTAzcnF0aWdlc3B3ZG4ifQ.emMb8nYj7XXUg70EaBVZ7g'

//TileLayers
var TileLayer = L.tileLayer(tilecode, {
    attribution: attribution,
    maxZoom: 20,
    id: tileid,
    accessToken: accessToken
}).addTo(MSR_Map);

var TileLayer = L.tileLayer(tilecode, {
    attribution: attribution,
    maxZoom: 20,
    id: tileid,
    accessToken: accessToken
}).addTo(AIF_Map);

//Populate with pins
var usedCoords = []
msr_portfolios.forEach((portfolio) => {

    if (usedCoords.filter(c => c[0] == portfolio.coords[0] && c[1] == portfolio.coords[1]).length > 0) {
        //console.log('same: ' + portfolio.coords)
        portfolio.coords[0] += (Math.random() - 0.5) / 800
        portfolio.coords[1] += (Math.random() - 0.5) / 800
        //console.log('diff: ' + portfolio.coords)
    }
    usedCoords.push(portfolio.coords)

    var marker = L.marker(portfolio.coords).addTo(MSR_Map);
    var popup = 
        `
        <a class="popup" href="${portfolio.href}">
        <img src="${portfolio.media_source}">
        <table>
            <tr><td>Regimental Number</td><td>${portfolio.regimentNo}</td></tr>
            <tr><td>Name</td><td>${portfolio.name}</td></tr>
            <tr><td>Address</td><td>${portfolio.address}</td></tr>
            <tr><td>Unit</td><td>${portfolio.battalion}</td></tr>
        </table>
        </a>
        `
    marker.bindPopup(popup)
})

usedCoords = []
aif_portfolios.forEach((portfolio) => {

    if (usedCoords.filter(c => c[0] == portfolio.coords[0] && c[1] == portfolio.coords[1]).length > 0) {
        //console.log('same: ' + portfolio.coords)
        portfolio.coords[0] += (Math.random() - 0.5) / 800
        portfolio.coords[1] += (Math.random() - 0.5) / 800
        //console.log('diff: ' + portfolio.coords)
    }
    usedCoords.push(portfolio.coords)

    var marker = L.marker(portfolio.coords).addTo(AIF_Map);
    var popup =
        `
        <a class="popup" href="${portfolio.href}">
        <table>
            <tr><td>Regimental Number</td><td>${portfolio.regimentNo}</td></tr>
            <tr><td>Name</td><td>${portfolio.name}</td></tr>
            <tr><td>Address</td><td>${portfolio.address}</td></tr>
            <tr><td>Unit</td><td>${portfolio.battalion}</td></tr>
        </table>
        </a>
        `
    marker.bindPopup(popup)
})

$('.nav-link').click(() => {
    MSR_Map.invalidateSize()
    AIF_Map.invalidateSize() 
})


