console.log("you are linked");
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;
//query selectors for the correlating info to be stored
const taskTitleInput = $("#task-title");
const dueDateInput = $("#task-due-date");
const taskDescripInput = $("#task-description");

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // create a new div element to rep  the task card
  const taskCard = $("<div>");
  taskCard.attr("id", "draggable").draggable();
  const cardHeader = $("<div>").addClass("card-header").text(task.title);
  const cardBody = $("<div>").addClass("card-body");
  const cardText = $("<p>").addClass("card-text").text(task.description);
  const cardDate = $("<p>").addClass("card-date").text(task.date);
  const deleteBtn = $("<button/>", {
    text: "Delete",
    click: function () {
      $(this).closest(".task-card").remove();
    },
  });
  //attach all the elements
  cardBody.append(cardText);
  cardBody.append(cardDate);
  taskCard.append(cardHeader);
  taskCard.append(cardBody);
  cardBody.append(deleteBtn);
  $("#todo-cards").append(taskCard);
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $(function () {
    $("#draggable").draggable();
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Get references to the modal and the button that triggers it
  const modal = $("#formModal");
  const modalButton = $("#home-add-task");
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

  $("#add-task-btn").on("click", function () {
    console.log("is working");
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTask = {
      title: taskTitleInput.val(),
      date: dueDateInput.val(),
      description: taskDescripInput.val(),
    };
    taskList.push(newTask);
    //save the updated tasks array back to local storage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    createTaskCard(newTask);
  });
}); //end of ready
