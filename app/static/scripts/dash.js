
// Global Variables
var default_tab = document.getElementById("default");
var tasks_tab = document.getElementById("new-task");
var reviews_tab = document.getElementById("new-review");

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

function getDefault(){

    // Make the Section visible
    document.getElementById("user-default").style.display = "block";

    document.getElementById("user-tasks").style.display = "none";
    document.getElementById("user-reviews").style.display = "none";
}

function getTasks(all_tasks){
    // console.log(all_tasks);

    var code = "";

    for (const [index, obj] of Object.entries(all_tasks)) {
        console.log(index, obj);
        var result = "<div class='task'><div class='task-data'><p class='task-title'>" + obj['title'] + "</p><p class='task-body'>" + obj['message'] + "</p></div>";
        var button_section = "<div class='task-buttons'><button id='edit'>Edit</button><button id='delete'>Delete</button></div></div>";

        code += (result + button_section);
    }

    // Add the text
    var section = document.getElementById("task-section");
    section.innerHTML = code;

    // Make the Section visible
    document.getElementById("user-tasks").style.display = "block";

    document.getElementById("user-default").style.display = "none";
    document.getElementById("user-reviews").style.display = "none";
}

function getReviews(all_reviews){

    // Make the Section visible
    document.getElementById("user-reviews").style.display = "block";

    document.getElementById("user-tasks").style.display = "none";
    document.getElementById("user-default").style.display = "none";
}
