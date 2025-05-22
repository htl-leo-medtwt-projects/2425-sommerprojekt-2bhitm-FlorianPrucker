/// <reference path="../data/data.js" />
/// <reference path="../data/data2.js" />
var map = new jsVectorMap({
    map: 'world',
    selector: '#map',
    regionsSelectable: true,
    regionsSelectableOne: true
})
let timer;
let printInfo = document.getElementById('printInfo')
let Baustein = ""
loop()
function loop() {
    if(map.getSelectedRegions() != "") {
        console.log(map.getSelectedRegions())
        setCountry(map.getSelectedRegions())
        map.clearSelectedRegions()
    }
    timer = setTimeout(loop, 500);
}
function setCountry(selectedCountry){
    data2.forEach(country => {
        console.log(country.cID, selectedCountry[0])
        if(country.cID == selectedCountry[0]){
            Baustein += `<p>Name: ${country.cName}</p>
            <p>ID: ${country.cID}</p>
            <p>Kontinent: ${country.continent}</p>
            <p>Beschreibung: ${country.description}</p>
            <p>Hauptstadt: ${country.info.Hauptstadt}</p>
            <p>Bevölkerung: ${country.info.Bevölkerung}</p>
            <p>Amtssprachen: ${country.info.Amtssprache}</p>
            <p>Währung: ${country.info.Währung}</p>
            `
            printInfo.style.display = 'block'
            printInfo.innerHTML = Baustein
        }
    });
}