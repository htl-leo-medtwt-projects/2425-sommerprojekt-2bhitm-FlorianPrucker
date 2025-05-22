/// <reference path="../data/data.js" />
/// <reference path="../data/data2.js" />
let timer;
let country = null
let counter2 = 0
let mapData = document.getElementById('mapData')
let sum = 0
let counter = [0, 0, 0, 0, 0, 0]
let continentArray = ["Europa", "Asien", "Südamerika", "Nordamerika", "Afrika", "Ozeanien"]
let counterr = new Array(continentArray.length).fill(0)
let allCountriesContinent = []
let allCountriesContinentCopy = []
function getNewCountry(continent) {
    let save = []
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
                        save.push(window.data[f].Countries[g].CountryName)
                    }
                    c = 0
                }
            }
        }
    }
    allCountriesContinentCopy.push(save)
}
function setCountry(continent) {
    let Baustein = ""
    Baustein = `<div class="fin" style="display: flex; flex-direction: column;">`
    getNewCountry(continent)
    for (let y = 0; y < allCountriesContinent.length; y++) {
        for (let x = 0; x < data2.length; x++) {
            if (allCountriesContinent[y] == data2[x].cID) {
                Baustein += `<div class="displayItemsCountry" id="${data2[x].cName}" data-continent="${continent}"><img class="displayItemsImage2" src="./images/arrow.png" data-continent="${continent}"><h3 class="fort2" data-continent="${continent}">${data2[x].cName}</h3></div>`
            }
        }
    }
    let rech = 1
    Baustein += `</div>`
    cont = document.getElementById(continent)
    let cons = cont.nextElementSibling
    let currentMargin = 65 * allCountriesContinent.length + 'px'
    cons.animate([
        { marginBottom: '0px' },
        { marginBottom: currentMargin }
    ], {
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards'
    }).onfinish = () => {
        cont.innerHTML += Baustein
        let fin = document.getElementsByClassName('fin')
        fin[0].style.marginTop = rech + 'vh'
        cons.style.marginBottom = currentMargin;
    };
    for (i = 0; i < continentArray.length; i++) {
        if (continentArray[i] == continent) {
            counterr[i] = Array(allCountriesContinent.length).fill(0)
            break
        }
        if (continentArray[i] == continent) {
            return
        }
    }
    allCountriesContinent = []
}
document.addEventListener('click', (ev) => {
    if (counter2 != 0) {
        counter2 = 0
    }
    let target = ev.target
    let targId = ev.target.id
    let closFin = ev.target.closest(".displayItemsImage")
    let fort = ev.target.closest(".fort")
    let index = 0
    if (closFin == null) {
        if (ev.target.className == 'displayItemsCountry' || ev.target.className == 'displayItems') {
            closFin = ev.target.firstChild
        } else if (ev.target.className == 'fort2' || ev.target.className == 'fort') {
            closFin = ev.target.previousSibling
        } else {
            closFin = ev.target
        }
    }
    console.log(closFin.className)
    if (closFin.classList[1] != undefined) {
        closFin.classList.remove(closFin.classList[1])
    }
    let targ = ev.target.className
    if (targ == 'displayItems') {
        targ = document.getElementsByClassName('displayItems')
    }
    if (targ == 'displayItemsImage') {
        targ = document.getElementsByClassName('displayItemsImage')
    }
    if (targ == 'displayItemsCountry') {
        targ = document.getElementsByClassName('displayItemsCountry')
    }
    if (target.classList.contains('fort2')) {
        let targetDisplayItem = target.closest('.displayItems');
        if (targetDisplayItem) {
            const currentContinent = targetDisplayItem.getAttribute('data-continent');
            const allSameContinent = Array.from(document.querySelectorAll(`.fort2[data-continent="${currentContinent}"]`));
            let fortTarget = target.closest('.fort2');
            if (fortTarget) {
                let index = allSameContinent.indexOf(fortTarget);
            }
            targ = document.getElementsByClassName('fort2')
        }
    }
    if (target.classList.contains('displayItemsImage2')) {
        let targetDisplayItem = target.closest('.displayItems');
        if (targetDisplayItem) {
            const currentContinent = targetDisplayItem.getAttribute('data-continent');
            const allSameContinent = Array.from(document.querySelectorAll(`.displayItemsImage2[data-continent="${currentContinent}"]`));
            let fortTarget = target.closest('.displayItemsImage2');
            if (fortTarget) {
                let index = allSameContinent.indexOf(fortTarget);
            }
            targ = document.getElementsByClassName('displayItemsImage2')
        }
    }
    if (closFin.className == 'displayItemsImage' || fort != null && fort.classList.contains("fort") || targ == 'fort' || targ[0] != undefined && targ[0].className == 'displayItems') {
        let i = 0
        for (i = 0; i < continentArray.length; i++) {
            if (targ != 'fort') {
                if (targ[i].className == 'displayItems') {
                    if (targId == targ[i].id) {
                        if (targ[i].lastChild.className == 'fort') {
                            fort = targ[i].lastChild
                        } else {
                            fort = targ[i].children[1]
                        }
                    }
                } else if (targ[i].className == 'displayItemsImage') {
                    if (closFin == targ[i]) {
                        fort = targ[i].nextElementSibling
                    }
                }
            }
            if (fort == null) {
                continue
            }
            if (continentArray[i] == fort.innerHTML) {
                break
            }
        }
        if (counter[i] % 2 == 0) {
            closFin.classList.add('expandBoxAnim1');
            setTimeout(() => {
                closFin.classList.remove('expandBoxAnim1');
                closFin.style.transform = 'rotate(-90deg)'
            }, 500);
            setTimeout(() => {
                setCountry(fort.innerHTML, i);
            }, 500);
        } else {
            let p = 0
            if (fort.className == 'fin') {
                fort = fort.previousSibling
            } else if (fort.className == 'displayItemsImage') {
                fort = fort.parentNode
            }
            for (p = 0; p < continentArray.length; p++) {
                if (fort.innerHTML == continentArray[p]) {
                    break
                }
            }
            let countryDiv = document.getElementsByClassName('displayItemsCountry')
            if (!countryDiv) return;
            let countryId = null
            for (let i = 0; i < countryDiv.length; i++) {
                if (countryDiv[i].parentNode.parentNode.nextSibling.id == 'inside') {
                    countryId = countryDiv[i].id;
                    break
                }
            }
            closFin.classList.add('shrinkBoxAnim1');
            setTimeout(() => {
                closFin.classList.remove('shrinkBoxAnim1');
                closFin.style.transform = 'rotate(0deg)'
            }, 500);
            let cond = document.getElementsByClassName('displayItems')
            cond[p].nextElementSibling.animate([
                { marginBottom: getComputedStyle(cond[p].nextElementSibling).marginBottom },
                { marginBottom: '0px' }
            ], {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards'
            }).onfinish = () => {
                if (cond[p].nextElementSibling.style.marginBottom != null) {
                    cond[p].nextElementSibling.style.marginBottom = '0px';
                }
            };
            let cond2 = document.getElementById(countryId)
            cond2.parentNode.parentNode.animate([
                { marginBottom: getComputedStyle(cond2.parentNode.parentNode).marginBottom },
                { marginBottom: '0px' }
            ], {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards'
            }).onfinish = () => {
                cond2.parentNode.parentNode.style.marginBottom = '0px';
            };
            cond[p].lastChild.classList.add('fadeOutAndShrink')
            setTimeout(() => {
                cond[p].lastChild.classList.remove('fadeOutAndShrink')
                cond[p].lastChild.remove()
            }, 1000);
        }
        counter[i]++
    } else if (targ[0].className == 'displayItemsCountry' || targ[0].className == 'displayItemsImage2' || targ[0].className == 'fort2') {
        let countryDiv = target.closest('.displayItemsCountry');
        if (!countryDiv) return;
        let countryId = countryDiv.id;
        let continent = document.getElementsByClassName('displayItems')
        let continentId = countryDiv.parentNode.parentNode.id
        for (let i = 0; i < allCountriesContinentCopy.length; i++) {
            let j = allCountriesContinentCopy[i].indexOf(countryId);
            let f = continentArray.indexOf(continentId)
            if (j !== -1 && i !== -1) {
                if (counterr[f][j] % 2 === 0) {
                    closFin.classList.add('expandBoxAnim1');
                    setTimeout(() => {
                        closFin.classList.remove('expandBoxAnim1');
                        closFin.style.transform = 'rotate(-90deg)'
                    }, 500);
                    setTimeout(() => {
                        setSum(countryId);
                    }, 500);
                } else {
                    closFin.classList.add('shrinkBoxAnim1');
                    setTimeout(() => {
                        closFin.classList.remove('shrinkBoxAnim1');
                        closFin.style.transform = 'rotate(0deg)'
                    }, 500);
                    let cond = document.getElementById(countryId);
                    cond.parentNode.parentNode.animate([
                        { marginBottom: getComputedStyle(cond.parentNode.parentNode).marginBottom },
                        { marginBottom: '0px' }
                    ], {
                        duration: 500,
                        easing: 'ease-in-out',
                        fill: 'forwards'
                    }).onfinish = () => {
                        cond.parentNode.parentNode.style.marginBottom = '0px';
                    };
                    cond.lastChild.classList.add('fadeOutAndShrink')
                    setTimeout(() => {
                        cond.lastChild.classList.remove('fadeOutAndShrink')
                        cond.lastChild.remove();
                    }, 1000);
                }
                for (let g = 0; g < continent.length; g++) {
                    if (continent[g].lastChild.className == 'fin' && counter[g] != 0) {
                        let childNodes = continent[g].lastChild.childNodes;
                        console.log(childNodes)
                        for (let h = 0; h < childNodes.length; h++) {
                            if (countryId != continent[g].lastChild.childNodes[h].id && counterr[g][h] % 2 != 0) {
                                let cond = document.getElementById(continent[g].lastChild.childNodes[h].id);
                                cond.firstChild.classList.add('shrinkBoxAnim1');
                                setTimeout(() => {
                                    cond.firstChild.classList.remove('shrinkBoxAnim1');
                                    cond.firstChild.style.transform = 'rotate(0deg)'
                                }, 500);
                                cond.parentNode.parentNode.animate([
                                    { marginBottom: getComputedStyle(cond.parentNode.parentNode).marginBottom },
                                    { marginBottom: '0px' }
                                ], {
                                    duration: 500,
                                    easing: 'ease-in-out',
                                    fill: 'forwards'
                                }).onfinish = () => {
                                    cond.parentNode.parentNode.style.marginBottom = '0px';
                                };
                                cond.lastChild.classList.add('fadeOutAndShrink')
                                setTimeout(() => {
                                    cond.lastChild.classList.remove('fadeOutAndShrink')
                                    cond.lastChild.remove();
                                }, 1000);
                                counterr[g][h]++
                            }
                        }
                    }
                }
                counterr[f][j]++;
                break
            }
        }
    }
})
function setSum(country1) {
    let Baustein = ""
    Baustein = `<div class="test" style="position: absolute; top: 0; left: 110%;">`
    let allSums = []
    let changedData = []
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if (window.data[i].Countries[j].CountryName == country1) {
                for (let x = 0; x < window.data[i].Countries[j].Verkaufszahlen.length; x++) {
                    sum += window.data[i].Countries[j].Verkaufszahlen[x]
                }
                allSums.push(sum)
                changedData.push(window.data[i].Name)
                for (let i = 0; i < window.data.length - 1; i++) {
                    for (let j = 1; j < window.data.length; j++) {
                        if (allSums[j] > allSums[j - 1]) {
                            let interchange = changedData[j - 1]
                            changedData[j - 1] = changedData[j]
                            changedData[j] = interchange
                            let interchange2 = allSums[j - 1]
                            allSums[j - 1] = allSums[j]
                            allSums[j] = interchange2
                        }
                    }
                }
            }
            sum = 0
        }
    }
    for (let i = 0; window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if (window.data[i].Countries[j].CountryName == country1) {
                rech = 5
                counter2++
                Baustein += `<div class="displayItemsCars" style="margin-top: ${rech}px;"><h3 style="display: flex; justify-content: space-between; width: 100%;"><span>${counter2}</span><span style="flex: 1; text-align: center;">${changedData[i]}</span><span>${allSums[i]}</span></h3></div>`
            }
            if (counter2 > 9) {
                break
            }
        }
        if (counter2 > 9) {
            break
        }
    }
    Baustein += `</div>`
    let countryElem = document.getElementById(country1)
    let cons = countryElem.parentNode.parentNode
    let punkt = document.getElementsByClassName('displayItemsCountry')
    let i = 0
    for (i = 0; i < punkt.length; i++) {
        if (country1 == punkt[i].id) {
            break
        }
    }
    let currentMargin = (61 * counter2) + (61 * i) + 'px'
    cons.animate([
        { marginBottom: '0px' },
        { marginBottom: currentMargin }
    ], {
        duration: 500,
        easing: 'ease-in-out',
        fill: 'forwards'
    }).onfinish = () => {
        countryElem.innerHTML += Baustein
        cons.style.marginBottom = currentMargin;
    };
    allCountriesContinent = []
    counter2 = 0
}