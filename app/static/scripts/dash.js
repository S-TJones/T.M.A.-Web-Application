
// Open & Close of the Aside
function openNav() {
    document.getElementById("aside-open").style.display = "none";
    document.getElementById("aside-close").style.display = "block";

    document.getElementById("side-buttons").style.display = "flex";
}

function closeNav() {
    document.getElementById("aside-close").style.display = "none";
    document.getElementById("aside-open").style.display = "block";

    document.getElementById("side-buttons").style.display = "none";
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

var delete_base = "delete-";
var cancel_base = "cancel-";
var edit_base = "edit-";
var save_base = "save-";
var text_base = "task-text-";
var form_base = "task-form-";
var textarea_base = "task-data-";

function editTask(button_id, task_message){

    // Make the Section visible
    document.getElementById("edit-form-"+button_id).style.display = "block";
    document.getElementById(save_base+button_id).style.display = "block";
    document.getElementById(textarea_base+button_id).style.display = "block";
    document.getElementById(cancel_base+button_id).style.display = "block";

    document.getElementById(edit_base+button_id).style.display = "none";
    document.getElementById(text_base+button_id).style.display = "none";
    document.getElementById(delete_base+button_id).style.display = "none";

    //
    document.getElementById(textarea_base+button_id).innerHTML = task_message.trim();
}

function cancelEdit(button_id){

    // Make the Section visible
    document.getElementById("edit-form-"+button_id).style.display = "none";
    document.getElementById(save_base+button_id).style.display = "none";
    document.getElementById(form_base+button_id).style.display = "none";
    document.getElementById(cancel_base+button_id).style.display = "none";

    document.getElementById(edit_base+button_id).style.display = "block";
    document.getElementById(text_base+button_id).style.display = "block";
    document.getElementById(delete_base+button_id).style.display = "block";
}