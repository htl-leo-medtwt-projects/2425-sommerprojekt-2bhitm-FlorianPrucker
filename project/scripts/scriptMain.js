let sidebar = document.getElementById('sidebar')
let change = 1
function changeBar(){
    if(change == 1){
        sidebar.style.transform = 'translate(0px)'
        sidebar.style.transition = '0.5s transform ease-out'
        change++
    }else{
        sidebar.style.transform = 'translate(-138px)'
        sidebar.style.transition = '0.5s transform ease-out'
        change--
    }
}