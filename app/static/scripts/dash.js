
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
function getDefault(){

    // Make the Section visible
    document.getElementById("user-default").style.display = "block";

    document.getElementById("user-tasks").style.display = "none";
    document.getElementById("user-reviews").style.display = "none";
}

function getTasks(){
    
    document.getElementById("user-tasks").style.display = "block";

    document.getElementById("user-default").style.display = "none";
    document.getElementById("user-reviews").style.display = "none";
}

function getReviews(){
// function getReviews(all_reviews){

    // Make the Section visible
    document.getElementById("user-reviews").style.display = "block";

    document.getElementById("user-tasks").style.display = "none";
    document.getElementById("user-default").style.display = "none";
}