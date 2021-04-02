
function openPopup() {
    document.getElementById("popUp").style.display = "block";
}

function closePopup() {
    document.getElementById("popUp").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var modal = document.getElementById('popUp');
    
    if (event.target == modal) {
        closePopup();
    }
}