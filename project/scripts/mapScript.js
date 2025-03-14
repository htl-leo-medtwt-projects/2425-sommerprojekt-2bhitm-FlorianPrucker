var map = new jsVectorMap({
    map: 'world',
    selector: '#map', 
    regionsSelectable: true,
    regionsSelectableOne: true
})
let timer;
loop()
function loop() {
    if(map.getSelectedRegions() != "") {
        console.log(map.getSelectedRegions())
    }
    timer = setTimeout(loop, 500);
}