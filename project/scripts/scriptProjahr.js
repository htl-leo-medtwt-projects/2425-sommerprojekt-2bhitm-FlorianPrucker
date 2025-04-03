/// <reference path="../data/data.js" />
let setCountry = document.getElementById('setCountry')
let setMonth = document.getElementById('setMonth')
let content = document.getElementById('content')
let root = document.querySelector(':root')
let result = document.getElementById('result')
let Baustein = ''
let allCountries = []
let checkedNum = 0
let container = document.getElementById('container')
container.style.display = 'block'
buildOptions()
function buildOptions() {
    Baustein += `<select id="setCountry">`
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if (i == 0 && j == 0) {
                for (let k = 0; k < window.data[i].Countries.length; k++) {
                    allCountries.push(window.data[i].Countries[k].CountryName)
                }
            } else {
                for (let k = 0; k < allCountries.length; k++) {
                    if (allCountries[k] == window.data[i].Countries[j].CountryName) {
                        checkedNum++
                    }
                }
                if (checkedNum == 0) {
                    allCountries.push(window.data[i].Countries[j].CountryName)
                } else {
                    checkedNum = 0
                }
            }
        }
    }
    console.log(allCountries)
    for (let i = 0; i < allCountries.length; i++) {
        Baustein += `<option id="incredient" value="${allCountries[i]}">${allCountries[i]}</option>`
    }
    Baustein += `</select>`
    content.innerHTML += Baustein
}
Baustein = ''
Baustein += `<select id="setMonth">
            <option value="0">Jänner</option>
            <option value="1">Februar</option>
            <option value="2">März</option>
            <option value="3">April</option>
            <option value="4">Mai</option>
            <option value="5">Juni</option>
            <option value="6">Juli</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">Oktober</option>
            <option value="10">November</option>
            <option value="11">Dezember</option>
        </select>`
content.innerHTML += Baustein
let allValues = []
let allNames = []
document.addEventListener('keypress', (ev) => {
    setCountry = document.getElementById('setCountry');
    setMonth = document.getElementById('setMonth');
    if (ev.key == 'Enter') {
        getCountryMonth(setCountry.value, setMonth.value)
        ev.preventDefault()
    }
})
function getCountryMonth(country, month) {
    for (let i = 0; i < window.data.length; i++) {
        for (let j = 0; j < window.data[i].Countries.length; j++) {
            if (window.data[i].Countries[j].CountryName == country) {
                for (let z = 0; z < window.data[i].Countries[j].Verkaufszahlen.length; z++) {
                    if (z == month) {
                        allValues.push(window.data[i].Countries[j].Verkaufszahlen[z])
                        allNames.push(window.data[i].Name)
                    }
                }
            }
        }
    }
    console.log(allValues, allNames)
    drawContent(country, month)
}
function drawContent(country, month) {
    let Baustein = ""
    for (let i = 0; i < allValues.length; i++) {
        for (let j = 0; j < allValues.length; j++) {
            if (allValues[i] > allValues[j]) {
                let interchange = allValues[i]
                let interchange2 = allNames[i]
                allValues[i] = allValues[j]
                allNames[i] = allNames[j]
                allValues[j] = interchange
                allNames[j] = interchange2
            }
        }
    }
    Baustein += `<table>
                <label for="table">Best-selling car brand in ${country}, ${month}</label>
                    <tr>
                        <th>Name</th>
                        <td>Sales figures</td>
                    </tr>
                </table>`
    for (let i = 0; i < allValues.length; i++) {
        Baustein += `<table>
                    <tr>
                        <td>${allNames[i]}</td>
                        <td>${allValues[i]}</td>
                    </tr>
                </table>`
    }
    result.innerHTML += Baustein
    buildGraph(country)
}
let test = 'Österreich'
buildGraph(test)
function buildGraph(country) {
    console.log(country)
    var chart = anychart.area();

    chart.title("Number of Sold Cars per Month");
    let sum = 0
    let arrayOfMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newData = [];
    let setMax = 0
    let setMin = 0
    for (let z = 0; z < window.data[0].Countries[0].Verkaufszahlen.length; z++) {
        for (let i = 0; i < window.data.length; i++) {
            for (let j = 0; j < window.data[i].Countries.length; j++) {
                if (window.data[i].Countries[j].CountryName == country) {
                    sum += (window.data[i].Countries[j].Verkaufszahlen[z])
                }
            }
        }
        newData.push([arrayOfMonths[z], sum])
        if (sum > setMax) {
            setMax = sum
        }
        if (z == 0) {
            setMin = sum
        } else if (sum < setMin) {
            setMin = sum
        }
        sum = 0
    }
    chart.area(newData)
    var yScale = chart.yScale();
    yScale.minimum(setMin);
    yScale.maximum(setMax);
    var yTicks = chart.yScale().ticks();
    yTicks.interval(2000);
    var yLabels = chart.yAxis().labels();
    yLabels.format("{%value}{groupsSeparator: }");
    var yAxis = chart.yAxis();
    yAxis.title("Sold Cars");
    var xAxis = chart.xAxis();
    xAxis.title("Month");
    chart.xAxis().labels().format(function () {
        var value = this.value;
        value = value.substr(0, 3);
        return value
    });
    chart.container("container");
    chart.draw();
}