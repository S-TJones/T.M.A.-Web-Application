
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
        var result = "<div class='single-review'><p>" + JSON.stringify(obj['title']) + "</p><p>" + JSON.stringify(obj['message']) + "</p></div>";

        code += result;
    }

    

    console.log("Code is: " + code);

    var section = document.getElementById("task-section");
    section.innerHTML = code;
}