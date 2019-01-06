var slider = document.getElementById("slider");
var yearText = document.getElementById("yearTextbox");
var mapFootnoteText = document.getElementById("mapFootnote");
var lifeEventTitle = document.getElementById("lifeEventTitle");
var currentSlide = 0;
var totalSlides = 0;
var rgb = ["#EDC881", "#D13838", "#67d377", "#67a4d2"];
var navbar = document.getElementsByClassName("portNav");
var scrollBars = document.getElementsByClassName("customScroll");
var lifeStageColours = [];
var slideYears = [];
var slideCoords = [];
var slidePlace = [];
var lifeStageNames = [];

// Loops all lifestages
for (var i = 0; i < Portfolio.LifeStages.length; i++) {
    // Puts all lifestage colours into an array

    // Loops all slides in lifestage
    for (var j = 0; j < Portfolio.LifeStages[i].Slides.length; j++) {
        totalSlides++;
        lifeStageNames.push(Portfolio.LifeStages[i].heading);
        lifeStageColours.push(Portfolio.LifeStages[i].rgbValue);
        // Puts all slides start and end years in array
        var dB = new Date(Date.parse(Portfolio.LifeStages[i].Slides[j].dateStart));
        var dE = new Date(Date.parse(Portfolio.LifeStages[i].Slides[j].dateEnd));
        slideYears.push("[" + dB.getFullYear() + "," + dE.getFullYear() + "]");
        // Puts all slides coords in array
        slideCoords.push("[" + Portfolio.LifeStages[i].Slides[j].longitude + "," + Portfolio.LifeStages[i].Slides[j].latitude + "]");
        // Puts all slides locations in array
        slidePlace.push(Portfolio.LifeStages[i].Slides[j].location);
    }
}

console.log(lifeStageColours)

lifeEventTitle.innerHTML = lifeStageNames[0];
mapFootnoteText.innerHTML = slidePlace[0];

navbar[0].style.background = "#" + Portfolio.LifeStages[0].rgbValue;
navbar[1].style.background = "#" + Portfolio.LifeStages[0].rgbValue;
var ss = document.styleSheets[3]
ss.removeRule(0)
ss.insertRule('.customScroll::-webkit-scrollbar-thumb { background-color: #' + Portfolio.LifeStages[0].rgbValue + ' !important; }', 0);


function updatePortfolioView(val) {
    currentSlide = val;
    lifeEventTitle.innerHTML = lifeStageNames[val];
    mapFootnoteText.innerHTML = slidePlace[val];

    map.flyTo({
        center: JSON.parse(slideCoords[val]),
        zoom: 12.0
    });
    geojson.features[0].geometry.coordinates = JSON.parse(slideCoords[val])
    map.getSource('point').setData(geojson)
    updateColour(val)

    if (val == 0) {
        document.getElementById("slidePrev").style.visibility = 'hidden';
    }
    else {
        document.getElementById("slidePrev").style.visibility = 'visible';
    }
    if (val == totalSlides - 1) {
        document.getElementById("slideNext").style.visibility = 'hidden';
    }
    else {
        document.getElementById("slideNext").style.visibility = 'visible';
    }

}

function moveSlideForward() {
    if ($('#slides .active').index('#slides .carousel-item') == totalSlides- 1) {
        currentSlide = $('#slides .active').index('#slides .carousel-item')
    }
    else {
        currentSlide = $('#slides .active').index('#slides .carousel-item') + 1
    }

    console.log(currentSlide)
    map.getSource('point').setData(geojson)
    updaterSelector(currentSlide)
    updatePortfolioView(currentSlide)
};

function moveSlideBackward() {
    if ($('#slides .active').index('#slides .carousel-item') == 0) {
        currentSlide = $('#slides .active').index('#slides .carousel-item')
    }
    else {
        currentSlide = $('#slides .active').index('#slides .carousel-item') - 1
    }

    console.log(currentSlide)
    map.getSource('point').setData(geojson)
    updaterSelector(currentSlide)
    updatePortfolioView(currentSlide)
};

function updateColour(colourIndex) {

    navbar[0].style.background = "#" + lifeStageColours[colourIndex];
    navbar[1].style.background = "#" + lifeStageColours[colourIndex];

    var ss = document.styleSheets[3]

    // Use insertRule() for standards, addRule() for IE
    ss.removeRule(0)
    ss.insertRule('.customScroll::-webkit-scrollbar-thumb { background-color: #' + lifeStageColours[colourIndex] + ' !important; }',0);
}