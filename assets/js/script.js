console.log("you are linked");
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
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
  console.log("Creating task card for task:", task);
  // Assuming each task object has a 'status' property
  const status = task.status;

  // Verify the 'status' property is correctly retrieved
  console.log("Task Status:", status);
  // create a new div element to rep  the task card
  const taskId = generateTaskId();
  console.log(taskId);
  const taskCard = $("<div>")
    .addClass("card draggable")
    .attr("id", "task-" + taskId);

  // taskCard.attr("id", "draggable").draggable();
  const cardHeader = $("<div>")
    .addClass("card-header")

    .text(task.title);
  const cardBody = $("<div>").addClass("task-card-body");
  const cardText = $("<p>")
    .addClass("card-text")
    .addClass("mt-2")
    .text(task.description);
  const cardDate = $("<p>")
    .addClass("card-date")

    .text(task.date);
  const deleteBtn = $("<button/>")
    .addClass("btn")
    .addClass("btn-danger")
    .addClass("delete")
    .addClass("mb-1")
    .text("delete")
    .on("click", handleDeleteTask);
  $(document).on("click", ".delete", handleDeleteTask);
  //attach all the elements
  cardBody.append(cardText);
  cardBody.append(cardDate);
  taskCard.append(cardHeader);
  taskCard.append(cardBody);
  cardBody.append(deleteBtn);
  // $("#to-do").append(taskCard);

  const now = dayjs();
  const taskDueDate = dayjs(task.date, "MM/DD/YYYY");

  //  If the task is due today, make the card yellow. If it is overdue, make it red.
  if (now.isSame(taskDueDate, "day")) {
    taskCard.addClass("bg-warning text-white");
  } else if (now.isAfter(taskDueDate)) {
    taskCard.addClass("bg-danger text-white");
  } else {
  }

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
// Call renderTaskList and log a message before it
// console.log("Before calling renderTaskList");
// renderTaskList();
function renderTaskList() {
  //go to local storage and get the card in local storage or set to empty arry
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log("Task List Length:", taskList.length);
  //empty each lane
  $(".lane").empty();
  //loop over array from local storage
  taskList.forEach((task) => {
    console.log("Task Status:", task.status);

    const status = task.status;
    console.log("Task Status:", task.status);
    const taskCard = createTaskCard(task);
    console.log("Task Status:", status);
    //create card each time from localstorage
    //call create card from db
    createTaskCard;
    //append it to to do list
    $(`#${status}`).append(taskCard);
  });

  $(".draggable").draggable({
    opacity: 0.7,
    zIndex: 100,
    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
      // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  let newTask = {
    id: generateTaskId(),
    title: taskTitleInput.val(),
    date: dueDateInput.val(),
    description: taskDescripInput.val(),
    status: "to-do", //initial status of all cards
  };
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  createTaskCard(newTask);
  // $("#add-task-btn").on("click", function () {
  //   handleAddTask();
  // });
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskCard = $(event.target).closest(".card");
  const taskId = taskCard.attr("id").replace("task-", "");
  //remove task card
  taskCard.remove();
  // Update the tasks array by excluding the deleted task
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList = taskList.filter(function (task) {
    return task.id !== parseInt(taskId);
  });

  // Save the updated tasks array back to Local Storage
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  //make the lanes droppable

  const taskId = ui.draggable.attr("id").replace("task-", "");
  const updatedStatus = event.target.id;
  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let task of taskList) {
    if (task.id === parseInt(taskId)) {
      task.status = updatedStatus;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
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
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });
}); //end of ready
