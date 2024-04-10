console.log("you are linked");
// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));
//query selectors for the correlating info to be stored
const taskTitleInput = $("#task-title");
const dueDateInput = $("#task-due-date");
const taskDescripInput = $("#task-description");
// const modal = $("#formModal");
// const modalButton = $(".btn-success");
// Todo: create a function to generate a unique task id
function generateTaskId() {}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // create a new div element to rep  the task card
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Get references to the modal and the button that triggers it
  const modal = $(".modal");
  const modalButton = $(".btn-success");
  console.log(modal);
  console.log(modalButton);

  // Show the modal when the button is clicked
  modalButton.on("click", function () {
    modal.modal("show");
    console.log("somthing should show up");
  });

  // Hide the modal when the close button is clicked
  $(".close").on("click", function () {
    modal.modal("hide");
    console.log("click");
  });

  // Hide the modal when the "Add Task" button is clicked
  $(".btn-success").on("click", function () {
    modal.modal("hide");
  });

  $(".btn-success").on("click", function () {
    let addTask = JSON.parse(localStorage.getItem("tasks")) || [];
    const modalInputs = {
      title: taskTitleInput.val(),
      date: dueDateInput.val(),
      description: taskDescripInput.val(),
    };
    addTask.push(modalInputs);
    //save the updated tasks array back to local storage
    localStorage.setItem("tasks", JSON.stringify());
  });
}); //end of ready
