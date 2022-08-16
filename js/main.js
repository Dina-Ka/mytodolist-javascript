// Global Variables
var addTaskBtn;
var tasksListArray = [];
var task = {};
var priorityColor = {
  High: "danger",
  Low: "success",
  Medium: "info",
};
var currentUpdatedRow;
// Tool tip
var Tooltips = document.getElementsByClassName("tt");
Array.from(Tooltips).forEach((element) => {
  new bootstrap.Tooltip(element);
});

// Add a new task

addtaskbtn = document.getElementById("addtask");
addtaskbtn.onclick = function () {
  appendNewTask();
  displaytodo();
  clearinputs();
};

function appendNewTask() {
  var taskDate = document.getElementById("tododate").value;
  var taskName = document.getElementById("newtask").value;
  var taskPriority = document.getElementById("taskpriority").value;
  task = {
    name: taskName,
    date: taskDate,
    priority: taskPriority,
  };
  tasksListArray.push(task);
  console.log(tasksListArray);
}

function displaytodo() {
  var taskTable = "";
  tasksListArray.forEach((task, index) => {
    taskTable += `<tr>
      <td class="text-left text-td p-1 pb-0">${task.name}</td>
      <td class="text-left text-td p-1 pb-0">${task.date}</td>
      <td class="text-center text-td p-1 pb-0"><span class="badge bg-${
        priorityColor[`${task.priority}`]
      }">${task.priority} </span> </td>
      <td class="text-center p-0">
        <i class="fa fa-trash text-danger deletetask" onclick=deletetask(${index})></i>
        <i class="fa fa-edit text-success updatetask" onclick=updatetask(${index})></i>
      </td>
    </tr>`;
  });
  localStorage.setItem("todo", JSON.stringify(tasksListArray));
  document.getElementById("tasktable").innerHTML = taskTable;
}

function displaynorecord() {
  tasksListArray = [];
  var taskTable = "";
  taskTable += `<tr>
      <td class="text-center text-td p-1 pb-0" colspan="5">No Tasks added</td>
    </tr>`;
  document.getElementById("tasktable").innerHTML = taskTable;
}

// Delete task
function deletetask(id) {
  Swal.fire({
    title: "Do you want to delete the selected task?",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "confirm",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      tasksListArray.splice(id, 1);

      displaytodo();
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

// Reterive data
// localstorage, sessionstorage,cookies
// localStorage.getItem('todo'))
window.onload = function () {
  tasksListArray = JSON.parse(localStorage.getItem("todo"));
  checkdisplay();
  document.getElementById("updatetask").style.display = "none";
  clearinputs();
};

function checkdisplay() {
  if (tasksListArray) {
    displaytodo();
  } else {
    displaynorecord();
  }
}
// *************** Action Buttons ******************
// Clear All
document.getElementById("clearallbtn").onclick = function () {
  Swal.fire({
    title: "Do you want to delete all to do tasks",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: "confirm",
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      tasksListArray = [];
      displaynorecord();
      localStorage.removeItem("todo");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

// ********** search **************
// indexof lastindexof search charat
document.getElementById("searchinput").onkeyup = function () {
  if (this.value.length) {
    var taskTable = "";
    tasksListArray.forEach((task, index) => {
      if (
        task.name.toLowerCase().includes(this.value.toLowerCase()) ||
        task.priority.toLowerCase().includes(this.value.toLowerCase())
      ) {
        taskTable += `<tr>
            <td class="text-left text-td p-1 pb-0">${task.name}</td>
            <td class="text-left text-td p-1 pb-0">${task.date}</td>
            <td class="text-center text-td p-1 pb-0"><span class="badge bg-${
              priorityColor[`${task.priority}`]
            }">${task.priority} </span> </td>
            <td class="text-center p-0">
              <i class="fa fa-trash text-danger deletetask" onclick=deletetask(${index})></i>
              <i class="fa fa-edit text-success updatetask" onclick=updatetask(${index})></i>
            </td>
      </tr>`;
      }
      document.getElementById("tasktable").innerHTML = taskTable;
    });
  } else {
    checkdisplay();
  }
};

// ************** updatetask ****************
function updatetask(index) {
  currentUpdatedRow = index;
  document.getElementById("tododate").value = tasksListArray[index].date;
  document.getElementById("newtask").value = tasksListArray[index].name;
  document.getElementById("taskpriority").value =
    tasksListArray[index].priority;
  document.getElementById("updatetask").style.display = "inline-block";
  document.getElementById("addtask").style.display = "none";
}
document.getElementById("updatetask").onclick = function () {
  tasksListArray[currentUpdatedRow].date =
    document.getElementById("tododate").value;
  tasksListArray[currentUpdatedRow].name =
    document.getElementById("newtask").value;
  tasksListArray[currentUpdatedRow].priority =
    document.getElementById("taskpriority").value;
  document.getElementById("updatetask").style.display = "none";
  document.getElementById("addtask").style.display = "inline-block";
  displaytodo();
  clearinputs()
};

function clearinputs() {
  document.getElementById("tododate").value = "";
  document.getElementById("newtask").value = "";
}
