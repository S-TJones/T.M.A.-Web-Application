
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

function testTasks(all_tasks){
    console.log(all_tasks);

    var code = "";

    for (const [index, obj] of Object.entries(all_tasks)) {
        console.log(index, obj);
        var result = "<div class='task'><div class='task-data'><p class='task-title'>" + obj['title'] + "</p><p class='task-body'>" + obj['message'] + "</p></div><div class='task-buttons'><button id='edit'>Edit</button><button id='delete'>Delete</button></div></div>";

        code += result;
    }

    

    console.log("Code is: " + code);

    var section = document.getElementById("task-section");
    section.innerHTML = code;
}