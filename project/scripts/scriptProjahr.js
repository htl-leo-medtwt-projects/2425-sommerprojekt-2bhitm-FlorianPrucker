/// <reference path="../data/data.js" />
let setCountry = document.getElementById('setCountry')
let setMonth = document.getElementById('setMonth')
let content = document.getElementById('content')
document.addEventListener('keypress', (ev) => {
    if (ev.key === 'Enter') {
        ev.preventDefault()
    }
})
let Baustein = ''
let allCountries = []
let checked = true
buildOptions()
function buildOptions() {
    Baustein += `<select>`
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            for (let x = 0; x < window.data[i].Countries.length; x++) {
                console.log(j, window.data[i].Countries[j].CountryName, allCountries[x])
                if (window.data[i].Countries[j].CountryName == allCountries[x]) {
                    checked = false
                    break
                }

            }
            if(checked){
                allCountries.push(window.data[i].Countries[j].CountryName)
            }else{
                checked = true
            }
        }
    }
    console.log(allCountries)
    for (let i = 0; i < window.data.length; i++) {
        Baustein += `<option value="${allCountries[i]}">${allCountries[i]}</option>`
    }
    Baustein += `</select>`
    content.innerHTML += Baustein
}