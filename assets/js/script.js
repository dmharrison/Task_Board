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
  const taskId = generateTaskId();
  console.log(taskId);
  const taskCard = $("<div>")
    .addClass("card")
    .attr("id", "task-" + nextId)
    .draggable();
  // taskCard.attr("id", "draggable").draggable();
  const cardHeader = $("<div>").addClass("card-header").text(task.title);
  const cardBody = $("<div>").addClass("task-card-body");
  const cardText = $("<p>").addClass("card-text").text(task.description);
  const cardDate = $("<p>").addClass("card-date").text(task.date);
  const deleteBtn = $("<button/>")
    .addClass("btn")
    .addClass("btn-danger")
    .addClass("delete")
    .text("delete")
    .on("click", handleDeleteTask);
  $(document).on("click", ".delete", handleDeleteTask);
  //attach all the elements
  cardBody.append(cardText);
  cardBody.append(cardDate);
  taskCard.append(cardHeader);
  taskCard.append(cardBody);
  cardBody.append(deleteBtn);
  $("#todo-cards").append(taskCard);

  const now = dayjs();
  const taskDueDate = dayjs(task.Date, "DD/MM/YYYY");

  //  If the task is due today, make the card yellow. If it is overdue, make it red.
  if (now.isSame(taskDueDate, "day")) {
    taskCard.addClass("bg-warning text-white");
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass("bg-danger text-white");
    cardDeleteBtn.addClass("border-light");
  }

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $(function () {
    $("#draggable").draggable();
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  let newTask = {
    title: taskTitleInput.val(),
    date: dueDateInput.val(),
    description: taskDescripInput.val(),
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  createTaskCard(newTask);
  $("#add-task-btn").on("click", function () {
    handleAddTask();
  });
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskCard = $(event.target).closest(".card");
  const taskId = taskCard.attr("id");
  //remove task card
  taskCard.remove();
  // Update the tasks array by excluding the deleted task
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList = taskList.filter(function (task) {
    return task.id !== taskId;
  });

  // Save the updated tasks array back to Local Storage
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  //make the lanes droppable
  $("#to-do").droppable({
    accept: ".card",
  });
  $("#in-progress").droppable({
    accept: ".card",
  });
  $("#done").droppable({
    accept: ".card",
  });
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $(function () {
    console.log("ready!");
  });

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
    handleAddTask();
  });
  handleDrop();
}); //end of ready
