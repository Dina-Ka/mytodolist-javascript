// Global Variables
var addTaskBtn;
var tasksListArray = [];
var task = {};

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
  console.log("dina");
  console.log(task);
}

function displaytodo() {
  var taskTable = "";
  console.log("dina");
  console.log(tasksListArray);
  tasksListArray.forEach((task) => {
  
    taskTable += 
    `<tr>
      <td class="text-center text-td"><input type="checkbox" value="" data-taskid=""></td>
      <td class="text-center text-td">${task.name}</td>
      <td class="text-center text-td">${task.date}</td>
      <td class="text-center text-td"><span class="badge bg-danger">${task.priority} </span> </td>
      <td class="text-center">
        <i class="fa fa-trash text-danger"></i>
        <i class="fa fa-edit text-success"></i>
      </td>
    </tr>`;
  });
  console.log(taskTable);
  document.getElementById("tasktable").innerHTML = taskTable
}
