/// <reference path="../data/data.js" />
/// <reference path="../data/data2.js" />
var map = new jsVectorMap({
    map: 'world',
    selector: '#map', 
    regionsSelectable: true,
    regionsSelectableOne: true
})
let timer;
let country = null
let mapData = document.getElementById('mapData')
let sum = 0
let continentArray = ["Europa", "Asien", "Afrika", "Ozeanien", "Nordamerika", "Südamerika"]
loop()
function loop() {
    if(map.getSelectedRegions() != "") {
        country = map.getSelectedRegions()
        for (let i = 0; i < data2.length; i++) {
            for (let j = 0; j < continentArray.length; j++) {
                if(data2[i].continent == continentArray[j]){
                    setCountry(continentArray[j])
                }
            }
        }
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: "smooth",
          });
    }
    country = null
    map.clearSelectedRegions();
    timer = setTimeout(loop, 500);
}
function setCountry(continent){
    if(country == null){
        return
    }
    let Baustein = ""
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if(window.data[i].Countries[j].CountryCode == country){
                for (let x = 0; x < window.data[i].Countries[j].Verkaufszahlen.length; x++) {
                    sum += window.data[i].Countries[j].Verkaufszahlen[x]
                }
                for (let x = 0; x < 5; x++) {
                    let y = 0
                    for (y = 0; y < data2.length; y++) {
                        if(data2[y].cID == country){
                            break
                        }
                    }
                    Baustein += `<div id="displayItems" onclick="expandNumbers()"><img id="displayItemsImage" src="./images/arrow.png"><h3>${data2[y].cName}</h3></div>`
                }
                cont = document.getElementById(continent)
                cont.innerHTML += Baustein
            }
        }
    }
}
function expand(continent) {
    setCountry(continent)
}