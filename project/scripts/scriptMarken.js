/// <reference path="../data/data.js" />
let grid = document.getElementById('grid')
let sum = 0;
let previousSum = 0;
let changedData = [{}]
let mode = document.getElementById('mode')
let boxes = document.getElementById('boxes')
let search = document.getElementById('search')
let look = ""
window.changedData = JSON.parse(JSON.stringify(window.data));
let container = document.getElementById('container')
let toggle = 0

// Improved parameter handling
function handleSelectedBrand() {
  // Check URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  let selected = urlParams.get('selected');
  
  // If no parameter, check hash
  if(!selected && window.location.hash) {
    selected = window.location.hash.substring(1);
  }

  if(selected) {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      const selectedElement = document.getElementById(selected);
      if(selectedElement) {
        // Highlight the element
        selectedElement.classList.add('animSelected');
        setTimeout(() => {
          selectedElement.classList.remove('animSelected');
        }, 2000);
        
        // Scroll to element
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

// Initialize selection handling
handleSelectedBrand();

// Rest of the original file remains the same...
document.addEventListener('click', (ev) => {
  const container = document.getElementById("container");
  const element = document.getElementsByClassName("element")
  if (ev.target.id !== 'container' && ev.target.id !== 'sidebar' && ev.target.id !== 'sidebarButton' && ev.target.id !== 'boxes' && ev.target.id !== 'search') {
    if (ev.target.classList.contains(element) || ev.target.id === 'inh3' || ev.target.id === 'inimg') {
      toggle++
    }
    if (toggle % 2 != 0) {
      container.style.display = 'block'
      toggle++
    }
    else {
      container.style.display = 'none'
    }
  }
  if (ev.target.id === 'search') {
    grid.innerHTML = ""
    mode.style.display = 'block'
    search.checked = true
    boxes.checked = false
  } else if (ev.target.id === 'boxes') {
    grid.innerHTML = ""
    mode.value = ""
    mode.style.display = 'none'
    search.checked = false
    boxes.checked = true
    look = ""
    drawGrid(look)
  }
})

function changeMode() {
  grid.innerHTML = ""
  look = mode.value
  drawGrid(look)
}

let allSums = []
function berechne() {
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
}

berechne()
drawGrid(look)

function drawGrid(check) {
  let Baustein = ""
  if (search.checked) {
    let saveData = []
    let anzahl = 0
    for (let i = 0; i < window.data.length; i++) {
      if (window.changedData[i].Name.toLowerCase().includes(check.toLowerCase())) {
        saveData.push(window.changedData[i])
        anzahl++
      }
    }
    for (let i = 0; i < saveData.length; i++) {
      for (let j = 0; j < window.changedData.length; j++) {
        if (saveData[i] == window.changedData[j]) {
          Baustein += `<div id="${window.changedData[j].Name}" class="element" style="align-self:baseline;" onclick="showHeatMap('${window.changedData[j].Name}')"><h3 id="inh3">${window.changedData[j].Name}</h3><img id="inimg" src="./images/${window.changedData[j].Name.toLowerCase()}.png"></div>`
        }
      }
    }
  } else {
    for (let i = 0; i < window.data.length; i++) {
      Baustein += `<div id="${window.changedData[i].Name}" class="element" onclick="showHeatMap('${window.changedData[i].Name}')"><h3 id="inh3">${window.changedData[i].Name}</h3><img id="inimg" src="./images/${window.changedData[i].Name.toLowerCase()}.png"></div>`
    }
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
    // ... rest of the heatmap data remains unchanged ...
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
                if (dataSet.pc[n].id == restrictedValues[m]) {
                  warning = true
                }
              }
              if (!warning) {
                dataSet.pc[n].value = 0
              } else {
                warning = false
              }
            }
            break
          }
          sum = 0
        }
      }
      restrictedValues = []
      break;
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
