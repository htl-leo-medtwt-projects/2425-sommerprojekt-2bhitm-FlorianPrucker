/// <reference path="../data/data.js" />
let grid = document.getElementById('grid')
console.log(data)


function drawGrid() {
    let Baustein = ""
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].Countries.length; j++) {
        for (let x = 0; x < data[i].Countries[j].Verkaufszahlen.length; x++) {
          if(data[i].Countries[j].Verkaufszahlen[x].VZ)
        }
      }
      Baustein+= `<div id="element"><h3>${data[i].Name}</h3><img src="./images/toyota.png"></div>`
    }
}