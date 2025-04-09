/// <reference path="../data/data.js" />
let grid = document.getElementById('grid')
let sum = 0;
let previousSum = 0;
let changedData = [{}]
window.changedData = JSON.parse(JSON.stringify(window.data));
let container = document.getElementById('container')
let toggle = 0
const urlPamrams = (new URLSearchParams(window.location.search))
const selected = urlPamrams.get('selected')
if(selected != null){
  const selectedElement = document.getElementById(`${selected}`)
  window.location.href = `./marken.html#${selected}`
  selectedElement.classList.add('animSelected')
  setTimeout(() => {
    selectedElement.classList.remove('animSelected')
  }, 10000);
}
document.addEventListener('click', (ev)=>{
  const container = document.getElementById("container");
  const element = document.getElementsByClassName("element")
  if(ev.target.id !== 'container' && ev.target.id !== 'sidebar' && ev.target.id !== 'sidebarButton' && ev.target.id !== 'boxes' && ev.target.id !== 'search'){
    if (ev.target.classList.contains(element) ||  ev.target.id === 'inh3' || ev.target.id === 'inimg') {
      toggle++
    }
    if(toggle % 2 != 0){
      container.style.display = 'block'
      toggle++
    }
    else {
      container.style.display = 'none'
    }
  }
})
drawGrid()
function drawGrid() {
  let Baustein = ""
  let allSums = []
  for (let i = 0; i < window.data.length; i++) {
    getCarSum(i)
    allSums.push(sum)
    sum = 0
  }
  for (let i = 0; i < window.data.length - 1; i++) {
    for (let j = 1; j < window.data.length; j++) {
      if (allSums[j] > allSums[j - 1]) {
        let interchange = window.changedData[j - 1]
        window.changedData[j - 1] = window.changedData[j]
        window.changedData[j] = interchange
        let interchange2 = allSums[j - 1]
        allSums[j - 1] = allSums[j]
        allSums[j] = interchange2
      }
      previousSum = sum
      sum = 0
    }
    previousSum = 0
  }
  console.log(window.changedData, window.data)
  for (let i = 0; i < window.data.length; i++) {
    Baustein += `<div id="${window.changedData[i].Name}" class="element" onclick="showHeatMap('${window.changedData[i].Name}')"><h3 id="inh3">${window.changedData[i].Name}</h3><img id="inimg" src="./images/${window.changedData[i].Name.toLowerCase()}.png"></div>`
  }
  grid.innerHTML += Baustein
}
function getCarSum(i) {
  for (let j = 0; j < window.data[i].Countries.length; j++) {
    for (let x = 0; x < window.data[i].Countries[j].Verkaufszahlen.length; x++) {
      sum += window.data[i].Countries[j].Verkaufszahlen[x]
    }
  }
}
function showHeatMap(search) {
  const container = document.getElementById("container");
    if (container) {
        container.innerHTML = "";
    }
  var map = anychart.map();
  var dataSet = anychart.data.set(
    [{ "id": "AF", "value": 0 },
    { "id": "AO", "value": 1 },
    { "id": "AL", "value": 2 },
    { "id": "AE", "value": 3 },
    { "id": "AR", "value": 4 },
    { "id": "AM", "value": 5 },
    { "id": "TF", "value": 6 },
    { "id": "AU", "value": 7 },
    { "id": "AT", "value": 8 },
    { "id": "AZ", "value": 9 },
    { "id": "BI", "value": 10 },
    { "id": "BE", "value": 11 },
    { "id": "BJ", "value": 12 },
    { "id": "BF", "value": 13 },
    { "id": "BD", "value": 14 },
    { "id": "BG", "value": 15 },
    { "id": "BA", "value": 16 },
    { "id": "BY", "value": 17 },
    { "id": "BZ", "value": 18 },
    { "id": "BO", "value": 19 },
    { "id": "BR", "value": 20 },
    { "id": "BN", "value": 21 },
    { "id": "BT", "value": 22 },
    { "id": "BW", "value": 23 },
    { "id": "CF", "value": 24 },
    { "id": "CA", "value": 25 },
    { "id": "CH", "value": 26 },
    { "id": "CL", "value": 27 },
    { "id": "CN", "value": 28 },
    { "id": "CI", "value": 29 },
    { "id": "CM", "value": 30 },
    { "id": "Cyprus_U.N._Buffer_Zone", "value": 31 },
    { "id": "CD", "value": 32 },
    { "id": "CG", "value": 33 },
    { "id": "CO", "value": 34 },
    { "id": "CR", "value": 35 },
    { "id": "CU", "value": 36 },
    { "id": "N._Cyprus", "value": 37 },
    { "id": "CY", "value": 38 },
    { "id": "CZ", "value": 39 },
    { "id": "DE", "value": 40 },
    { "id": "DJ", "value": 41 },
    { "id": "DK", "value": 42 },
    { "id": "DO", "value": 43 },
    { "id": "DZ", "value": 44 },
    { "id": "EC", "value": 45 },
    { "id": "EG", "value": 46 },
    { "id": "ER", "value": 47 },
    { "id": "ES", "value": 48 },
    { "id": "EE", "value": 49 },
    { "id": "ET", "value": 50 },
    { "id": "FI", "value": 51 },
    { "id": "FJ", "value": 52 },
    { "id": "FR", "value": 53 },
    { "id": "GA", "value": 54 },
    { "id": "GB", "value": 55 },
    { "id": "GE", "value": 56 },
    { "id": "GH", "value": 57 },
    { "id": "GN", "value": 58 },
    { "id": "GW", "value": 59 },
    { "id": "GQ", "value": 60 },
    { "id": "GR", "value": 61 },
    { "id": "GL", "value": 62 },
    { "id": "GT", "value": 63 },
    { "id": "GY", "value": 64 },
    { "id": "HN", "value": 65 },
    { "id": "HR", "value": 66 },
    { "id": "HT", "value": 67 },
    { "id": "HU", "value": 68 },
    { "id": "ID", "value": 69 },
    { "id": "IN", "value": 70 },
    { "id": "IE", "value": 71 },
    { "id": "IR", "value": 72 },
    { "id": "IQ", "value": 73 },
    { "id": "IS", "value": 74 },
    { "id": "IL", "value": 75 },
    { "id": "IT", "value": 76 },
    { "id": "JO", "value": 77 },
    { "id": "JP", "value": 78 },
    { "id": "KZ", "value": 79 },
    { "id": "KE", "value": 80 },
    { "id": "KG", "value": 81 },
    { "id": "KH", "value": 82 },
    { "id": "KR", "value": 83 },
    { "id": "Kosovo", "value": 84 },
    { "id": "KW", "value": 85 },
    { "id": "LA", "value": 86 },
    { "id": "LB", "value": 87 },
    { "id": "LR", "value": 88 },
    { "id": "LY", "value": 89 },
    { "id": "LK", "value": 90 },
    { "id": "LS", "value": 91 },
    { "id": "LT", "value": 92 },
    { "id": "LV", "value": 93 },
    { "id": "MA", "value": 94 },
    { "id": "MD", "value": 95 },
    { "id": "MG", "value": 96 },
    { "id": "MX", "value": 97 },
    { "id": "MK", "value": 98 },
    { "id": "ML", "value": 99 },
    { "id": "MM", "value": 100 },
    { "id": "ME", "value": 101 },
    { "id": "MN", "value": 102 },
    { "id": "MZ", "value": 103 },
    { "id": "MR", "value": 104 },
    { "id": "MW", "value": 105 },
    { "id": "MY", "value": 106 },
    { "id": "NA", "value": 107 },
    { "id": "NC", "value": 108 },
    { "id": "NE", "value": 109 },
    { "id": "NG", "value": 110 },
    { "id": "NI", "value": 111 },
    { "id": "NL", "value": 112 },
    { "id": "NO", "value": 113 },
    { "id": "NP", "value": 114 },
    { "id": "NZ", "value": 115 },
    { "id": "OM", "value": 116 },
    { "id": "PK", "value": 117 },
    { "id": "PA", "value": 118 },
    { "id": "PE", "value": 119 },
    { "id": "PH", "value": 120 },
    { "id": "PG", "value": 121 },
    { "id": "PL", "value": 122 },
    { "id": "PR", "value": 123 },
    { "id": "KP", "value": 124 },
    { "id": "PT", "value": 125 },
    { "id": "PY", "value": 126 },
    { "id": "PS", "value": 127 },
    { "id": "QA", "value": 128 },
    { "id": "RO", "value": 129 },
    { "id": "RW", "value": 130 },
    { "id": "EH", "value": 131 },
    { "id": "SA", "value": 132 },
    { "id": "SD", "value": 133 },
    { "id": "SS", "value": 134 },
    { "id": "SN", "value": 135 },
    { "id": "SL", "value": 136 },
    { "id": "SV", "value": 137 },
    { "id": "Somaliland", "value": 138 },
    { "id": "SO", "value": 139 },
    { "id": "RS", "value": 140 },
    { "id": "SR", "value": 141 },
    { "id": "SK", "value": 142 },
    { "id": "SI", "value": 143 },
    { "id": "SE", "value": 144 },
    { "id": "SZ", "value": 145 },
    { "id": "SY", "value": 146 },
    { "id": "TD", "value": 147 },
    { "id": "TG", "value": 148 },
    { "id": "TH", "value": 149 },
    { "id": "TJ", "value": 150 },
    { "id": "TM", "value": 151 },
    { "id": "TL", "value": 152 },
    { "id": "TN", "value": 153 },
    { "id": "TR", "value": 154 },
    { "id": "TW", "value": 155 },
    { "id": "TZ", "value": 156 },
    { "id": "UG", "value": 157 },
    { "id": "UA", "value": 158 },
    { "id": "UY", "value": 159 },
    { "id": "US", "value": 160 },
    { "id": "UZ", "value": 161 },
    { "id": "VE", "value": 162 },
    { "id": "VN", "value": 163 },
    { "id": "YE", "value": 164 },
    { "id": "ZA", "value": 165 },
    { "id": "ZM", "value": 166 },
    { "id": "ZW", "value": 167 },
    { "id": "RU", "value": 168 }]
  );
  let restrictedValues = []
  for (let i = 0; i < window.data.length; i++) {
    if (search == window.data[i].Name) {
      for (let k = 0; k < window.data[i].Countries.length; k++) {
        for (let b = 0; b < dataSet.pc.length; b++) {
          if (window.data[i].Countries[k].CountryCode == dataSet.pc[b].id) {
            restrictedValues.push(window.data[i].Countries[k].CountryCode)
            break
          }
        }
      }
      for (let z = 0; z < window.data[i].Countries.length; z++) {
        for (let j = 0; j < dataSet.pc.length; j++) {
          if (window.data[i].Countries[z].CountryCode == dataSet.pc[j].id) {
            for (let x = 0; x < window.data[i].Countries[z].Verkaufszahlen.length; x++) {
              sum += window.data[i].Countries[z].Verkaufszahlen[x]
            }
            dataSet.pc[j].value = sum
            let warning = false
            for (let n = 0; n < dataSet.pc.length; n++) {
              for (let m = 0; m < restrictedValues.length; m++) {
                if(dataSet.pc[n].id == restrictedValues[m]){
                  warning = true
                }
              }
              if(!warning){
                dataSet.pc[n].value = 0
              }else{
                warning = false
              }
            }
            break
          }
          sum = 0
        }
      }
      restrictedValues = []
    }
  }
  console.log(dataSet)
  series = map.choropleth(dataSet);
  series.geoIdField('id');
  series.colorScale(anychart.scales.linearColor('#deebf7', '#adead5', '#90db7f', '#ccca55', '#bc4631'));
  series.hovered().fill('#757787');
  map.geoData(anychart.maps['world']);
  map.container('container');
  map.draw();
}