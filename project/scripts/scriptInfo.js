let cont = document.getElementById('cont')
let close = document.getElementById('clos')
let ope = false
let checkedElem = null
setBox()
function setBox(){
    let Baustein = ""
    Baustein += `<div class="explanationBox" onclick="popUp(this)">
                    Allgemein
                </div>
                <div id="insideCont"><h3>Allgemein</h3><p id="txte">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p></div>
                <div class="explanationBox" onclick="popUp(this)">
                    Marken
                </div>
                <div id="insideCont"><h3>Marken</h3><p id="txte">Über dem Boxen Grid (per default) gibt es zwei Buttons mit einer Layout Auswahlmöglichkeit. Einerseits Box Layout was schon sichtbar ist. Jede Marke ist in einer Box eingeteilt. Bei Search Layout ist zusätzlich noch eine Suchleiste vorhanden mit dem man nach Marken suchen kann. Die Boxen sind immer absteigend nach insgesamten Verkaufszahlen sortiert.</p><br><p id="txte">Durch Klick auf eine Box wird eine Heatmap von den Verkaufszahlen der Automarke angezeigt. Bei hover über ein Land in der Heatmap kann man die Verkaufszahlen der Marken in dem Land sehen. Die Anzahl der Verkäufe ist auch farblich gekennzeichnet. </p></div>
                <div class="explanationBox" onclick="popUp(this)">
                    ProJahr
                </div>
                <div id="insideCont"><h3>ProJahr</h3><p id="txte">Unter dem Flächendiagramm sind Monat und Land Auswahlmöglichkeiten. Um die Eingabe zu bestätigen Enter drücken. Danach erscheint eine Tabelle oder wird aktualisiert genauso wie das Diagramm. In dieser Tabelle sind alle Verkaufszahlen nach Marken absteigend sortiert (durch Klick auf Markenname weiterleitung zu Marken.html). </p><br><p id="txte">Das Diagramm zeigt die Verkaufszahlen in den verschiedenen Monaten des ausgewählten Landes (Österreich per default).  Durch Klick auf einen der roten Punkte(bei Hover über Diagramm sichtbar) wird die Tabelle unten aktualisiert mit den Daten des neuen ausgewählten Monats.</div>`
    cont.innerHTML += Baustein
}
function popUp(elem){
    console.log(elem)
    elem = elem || null
    if(!ope){
        ope = true
        checkedElem = elem
        elem.nextElementSibling.style.display = 'block'
        elem.nextElementSibling.style.transform = 'scale(1)'
        elem.nextElementSibling.style.transition = '0.3s transform ease'
        clos.style.display = 'block'
    }else{
        ope = false
        checkedElem.nextElementSibling.style.transform = 'scale(0)'
        checkedElem.nextElementSibling.style.transition = '0.3s transform ease'
        checkedElem.nextElementSibling.style.display = 'none'
        clos.style.display = 'none'
    }
}