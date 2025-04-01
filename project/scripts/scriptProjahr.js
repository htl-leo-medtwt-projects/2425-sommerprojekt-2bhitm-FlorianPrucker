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
document.addEventListener('keypress', (ev) =>{
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
            if(window.data[i].Countries[j].CountryName == country) {
                for (let z = 0; z < window.data[i].Countries[j].Verkaufszahlen.length; z++) {
                    if(z == month) {
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
function buildGraph(country){
    var chart = anychart.area();

  chart.title("Number of Sold Cars per Month");

  chart.area([
    ["January" , 10000],
    ["February" , 12000],
    ["March" , 10000],
    ["April" , 11000],
    ["May" , 19000]
  ]);

  var yScale = chart.yScale();
  yScale.minimum(8000);
  yScale.maximum(20000);
  var yTicks = chart.yScale().ticks();
  yTicks.interval(2000);
  var yLabels = chart.yAxis(0).labels();
  yLabels.format("${%value}{groupsSeparator: }");
  var yAxis = chart.yAxis(0);
  yAxis.title("Revenue in US Dollars");
  var yAxsi1 = chart.yAxis(1);
  yAxsi1.orientation("right");
  yAxsi1.title("Sold Cars");
  var yLabels1 = chart.yAxis(1).labels();
  yLabels1.format(function() {
    var value = this.value;
    value = Math.round(value*0.7094716);
    return "\u20ac" + value;
  });
  var xAxis = chart.xAxis();
  xAxis.title("Month");
  chart.xAxis().labels().format(function() {
    var value = this.value;
    value = value.substr(0, 3);
    return value
  });
  chart.container("container");
  chart.draw();
}