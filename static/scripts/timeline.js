//ADD NON DATA-HOLDING / STRUCTURAL HTML
$('.t-slide').each((index, value) => {
    value.OG = {}
    value.OG.Start = value.getAttribute("data-start");
    value.OG.End = value.getAttribute("data-end");

    value.setAttribute("data-start", Date.parse(value.OG.Start));
    value.setAttribute("data-end", Date.parse(value.OG.End));

    value.OG.Start = new Date(value.OG.Start).getFullYear()
    value.OG.End = new Date(value.OG.End).getFullYear()

    console.log("date: " + value.OG.Start)
    console.log("date: " + value.OG.End)
})

//add selector div
$(".timeline").prepend('<div class="t-selector"></div>')
//add tabs to lifestages
$(".t-lifestage").append('<div class="t-tab"></div>')
//add start and end divs
$(".timeline").prepend('<h6 class="t-start"></h6>')
$(".timeline").prepend('<h6 class="t-end"></h6>')
//add date div
$(".t-selector").prepend('<h6 class="t-date"></h6>')
//add lines div
$(".timeline").prepend('<div class="t-line"></div>')
$(".timeline").prepend('<div class="t-line"></div>')
$(".timeline").prepend('<div class="t-line"></div>')

//GET HTML ELEMENTS
const timeline = document.getElementsByClassName("timeline")[0]

timeline.selector = timeline.getElementsByClassName("t-selector")[0]
timeline.selector.date = timeline.selector.getElementsByClassName("t-date")[0]
timeline.start = document.getElementsByClassName("t-start")[0]
timeline.end = document.getElementsByClassName("t-end")[0]
timeline.lifestages = timeline.getElementsByClassName("t-lifestage")
timeline.slides = []

//ASSIGN SLIDES TO LIFE STAGES
for (var i = 0; i < timeline.lifestages.length; i++) {
    //set slides
    timeline.lifestages[i].slides = timeline.lifestages[i].getElementsByClassName("t-slide")
    timeline.slides = timeline.slides.concat(Array.from(timeline.lifestages[i].slides))

    //console.log(timeline.slides)

    //set lifestages START and END and SPAN and TAB
    timeline.lifestages[i].start = timeline.lifestages[i].slides[0].getAttribute("data-start")
    timeline.lifestages[i].end = timeline.lifestages[i].slides[timeline.lifestages[i].slides.length - 1].getAttribute("data-end")
    timeline.lifestages[i].span = timeline.lifestages[i].end - timeline.lifestages[i].start
    timeline.lifestages[i].tab = timeline.lifestages[i].getElementsByClassName("t-tab")[0]
    timeline.lifestages[i].tab.slides = timeline.lifestages[i].slides

    //set slides START and END and SPAN
    for (var j = 0; j < timeline.lifestages[i].slides.length; j++) {
        timeline.lifestages[i].slides[j].start = timeline.lifestages[i].slides[j].getAttribute("data-start")
        timeline.lifestages[i].slides[j].end = timeline.lifestages[i].slides[j].getAttribute("data-end")
        timeline.lifestages[i].slides[j].span = timeline.lifestages[i].slides[j].end - timeline.lifestages[i].slides[j].start
        timeline.lifestages[i].slides[j].lifestage = timeline.lifestages[i]
    }

    //set timeline start and end dates

    var startDate = timeline.slides[0].start;
    var DateObject = new Date(startDate)
    console.log(DateObject)



    timeline.start.innerHTML = timeline.slides[0].OG.Start
    timeline.end.innerHTML = timeline.slides[timeline.slides.length - 1].OG.End
}

//set timeline START and END
timeline.start = timeline.lifestages[0].start
timeline.end = timeline.lifestages[timeline.lifestages.length - 1].end
timeline.span = timeline.end - timeline.start

//console.log("start: " + timeline.start)
//console.log("end: " + timeline.end)
//console.log("span: " + timeline.span)

//FORMAT TIMELINE
for (var i = 0; i < timeline.lifestages.length; i++) {
    //format lifestages
    timeline.lifestages[i].style.left = ((timeline.lifestages[i].start - timeline.start) / timeline.span) * 100 + "%"
    timeline.lifestages[i].style.width = (timeline.lifestages[i].span / timeline.span) * 100 + "%"
    timeline.lifestages[i].style.backgroundColor = "#" + timeline.lifestages[i].getAttribute("data-hex")// + "cc"

    //format slides
    for (var j = 0; j < timeline.lifestages[i].slides.length; j++) {
        timeline.lifestages[i].slides[j].style.left = ((timeline.lifestages[i].slides[j].start - timeline.lifestages[i].start) / timeline.lifestages[i].span) * 100 + "%"
        timeline.lifestages[i].slides[j].style.width = (timeline.lifestages[i].slides[j].span / timeline.lifestages[i].span) * 100 + "%"
    }
}

//INTERACTIVITY
let updaterSelector = (index = 0) => {
    timeline.selector.style.left = ((timeline.slides[index].start - timeline.start) / timeline.span) * 100 + "%"
    timeline.selector.style.width = (timeline.slides[index].span / timeline.span) * 100 + "%"
    timeline.selector.date.innerHTML = timeline.slides[index].OG.Start + " - " + timeline.slides[index].OG.End
}
updaterSelector()

//index slides
for (var i = 0; i < timeline.slides.length; i++) {
    timeline.slides[i].index = i;
}
//add event listeners to slides
$(".t-slide").click((event) => {
    event.stopPropagation()
    var index = event.target.index
    //console.log(index)
    $('.carousel').carousel(index)
    updaterSelector(index)
    updatePortfolioView(index)
})
//add event listeners to lifestages
$(".t-lifestage").click((event) => {
    //event.stopPropagation()
    var index = event.target.slides[0].index
    //console.log(index)
    $('.carousel').carousel(index)
    updaterSelector(index)
    updatePortfolioView(index)
})






