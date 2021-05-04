
// Open & Close of the Aside
function openNav() {
    document.getElementById("aside-open").style.display = "none";
    document.getElementById("aside-close").style.display = "block";

    document.getElementById("side-buttons").style.display = "flex";
    // document.getElementById("board").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("aside-close").style.display = "none";
    document.getElementById("aside-open").style.display = "block";

    document.getElementById("side-buttons").style.display = "none";
    // document.getElementById("board").style.marginLeft= "0";
}

// Other things