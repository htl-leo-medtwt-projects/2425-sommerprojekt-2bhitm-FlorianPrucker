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
let counter2 = 0
let mapData = document.getElementById('mapData')
let sum = 0
let counter = [0, 0, 0, 0, 0, 0]
let continentArray = ["Europa", "Asien", "Südamerika", "Nordamerika", "Afrika", "Ozeanien"]
let allCountriesContinent = []
loop()
function loop() {
    if (map.getSelectedRegions() != "") {
        country = map.getSelectedRegions()
        let continent = null
        let x = 0
        for (x = 0; x < data2.length; x++) {
            if (data2[x].cID == country) {
                break
            }
        }
        continent = document.getElementById(data2[x].continent)
        continent.scrollTo({
            top: 100,
            left: 100,
            behavior: "smooth",
        });
        let i = 0
        for (i = 0; i < continentArray.length; i++) {
            if (continentArray[i] == data2[x].continent) {
                break
            }
        }
        if (counter[i] % 2 == 0) {
            setCountry(data2[x].continent)
        } else {
            let cons = continent.nextElementSibling
            cons.style.marginBottom = '0px'
            let cond = document.getElementsByClassName('fin')
            for (let j = 0; j < cond.length; j++) {
                if (cond[j] == continent.lastChild)
                    cond[j].innerHTML = ''
            }
        }
        console.log(continent.lastChild)
        counter[i]++
    }
    country = null
    continent = null
    map.clearSelectedRegions();
    timer = setTimeout(loop, 500);
}
function getNewCountry(continent) {
    for (let f = 0; f < window.data.length; f++) {
        for (let g = 0; g < window.data[f].Countries.length; g++) {
            for (let h = 0; h < data2.length; h++) {
                if (data2[h].cID == window.data[f].Countries[g].CountryCode) {
                    let c = 0
                    for (let n = 0; n < allCountriesContinent.length; n++) {
                        if (allCountriesContinent[n] == window.data[f].Countries[g].CountryCode) {
                            c++
                        }
                    }
                    if (data2[h].continent == continent && c == 0) {
                        allCountriesContinent.push(window.data[f].Countries[g].CountryCode)
                    }
                    c = 0
                }
            }
        }
    }
}
function setCountry(continent) {
    let Baustein = ""
    Baustein = `<div class="fin" style="display: flex; flex-direction: column;">`
    getNewCountry(continent)
    for (let y = 0; y < allCountriesContinent.length; y++) {
        for (let x = 0; x < data2.length; x++) {
            if (allCountriesContinent[y] == data2[x].cID) {
                let rech = 0
                if (y == 0) {
                    rech = 60
                } else {
                    rech = 5
                }
                Baustein += `<div class="displayItemsCountry" id="${data2[x].cName}" style="margin-top: ${rech}px"><img id="displayItemsImage2" src="./images/arrow.png"><h3>${data2[x].cName}</h3></div>`
            }
        }
    }
    Baustein += `</div>`
    cont = document.getElementById(continent)
    let cons = cont.nextElementSibling
    cont.innerHTML += Baustein
    cons.style.marginBottom = 65 * allCountriesContinent.length + 'px'
    allCountriesContinent = []
}
document.addEventListener('click', (ev) => {
    let targ = ev.target.id
    let closFin = ev.target.closest("#displayItemsImage")
    if (ev.target.id == "fort" || closFin == "displayItemsImage" || ev.target.id == targ) {
        let targe = document.getElementById(targ)
        let i = 0
        if(targe.nextSibling == null){
            targe = targe.parentNode
        }
        for (i = 0; i < continentArray.length; i++) {
            if (continentArray[i] == targ) {
                break
            }
            console.log(targe, closFin)
            let t = ""
            if(targe == closFin){
                t = targe.nextSibling.firstChild.data
            }else{
                t = targe.firstChild.nextSibling.firstChild.data
            }
            if(targe.firstChild.nextSibling.id == "fort" && t == continentArray[i]){
               break 
            }
        }
        if (counter[i] % 2 == 0) {
            console.log(targe.id)
            setCountry(targe.id)
        } else {
            targe.style.marginBottom = '0px'
            let cond = document.getElementsByClassName('fin')
            for (let j = 0; j < cond.length; j++) {
                if (cond[j] == targ.lastChild)
                    cond[j].innerHTML = ''
            }
        }
        counter[i]++
    }else if(ev.target.id == targ){
        setSum(cor2)
    }
})
function setSum(country1) {
    let Baustein = ""
    Baustein = `<div>`
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if (window.data[i].Countries[j].CountryName == country1) {
                for (let x = 0; x < window.data[i].Countries[j].Verkaufszahlen.length; x++) {
                    sum += window.data[i].Countries[j].Verkaufszahlen[x]
                }
                if (j == 0) {
                    rech = 60
                } else {
                    rech = 5
                }
                counter2++
                Baustein += `<div class="displayItemsCars" style="margin-top: ${rech}px"><${counter2}><h3>${window.data[i].Name}</h3><h3 style="float: right;">${sum}</h3>></div>`
            }
            sum = 0
        }
    }
    Baustein += `</div>`
    let countryElem = document.getElementById(country1)
    countryElem.innerHTML += Baustein
}