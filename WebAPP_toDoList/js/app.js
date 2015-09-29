var taskInput = document.getElementById("new-task"); //new-task

var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-task

//New task List Item
var createNewTaskElement = function(taskString){
  
  //Create list item
  var listItem = document.createElement("li");
  //input (checkbox)
  var checkBox = document.createElement("input"); // checkBox
    //label
  var label = document.createElement("label");
    //input (text)
  var editInput = document.createElement("input"); //text
    //button.edit
  var editButton = document.createElement("button");
    //button.delete
  var deleteButton = document.createElement("button");
  
    //Each element needs modifying
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
    // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
  
} 

//Add a new task
var addTask = function() {
  console.log("AddTask...")
  
  if (taskInput.value !== "") {
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    
    //Append listItem to incompleteTasksHolder
    
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    
    taskInput.value = '';
  } else {
    
    alert ("Please type a task!");
    
    }
  
}

//Edit an existing task
var editTask = function() {
  console.log("EditTask...")
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var editButton = listItem.querySelector("button");
  
  var containsClass = listItem.classList.contains("editMode");
  //if the class of the parent is .editMode
  if (containsClass) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
     //Switch from .editMode
     //label text become the input's value
    
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
    //Switch to .editMode
     //input value becomes the label's text
     
    }
    //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
  
  
}

  

//Delete an existing task
var deleteTask = function() {
  console.log("DeleteTask...")
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
   //Remove the parent list item from the ul
  ul.removeChild(listItem);
  
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("TaskComplete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("TaskComplete...")
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


// Set the click handler to the AddTast funtion

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events");
  //Select taskListItem's children
  var checkbox= taskListItem.querySelector("input[type=checkbox]");
  var deleteButton= taskListItem.querySelector("button.delete");
  var editButton= taskListItem.querySelector("button.edit");
  
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkBoxEventHandler;
}


var ajaxRequest = function() {
  console.log("AJAX request"); //First steps for integrating the server

}

  //Set the click handler to the addtask function
  addButton.addEventListener("click", addTask);
  
  //addbutton.onclick = ajaxRequest
  
  addButton.addEventListener("click", ajaxRequest);

// Cycle over the incompleteTasksHolder ul list Items

for (var i=0; i< incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  
}
  

// Cycle over the completeTasksHolder ul list Items

for (var i=0; i< incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




