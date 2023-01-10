const btn = document.querySelector("button");
const input = document.querySelector("input");
const tasksContainer = document.querySelector(".tasks-container");

const events = ["click", "touchlist"];

localStorage.tasks;

function handleTaskCreator(event) {
  event.preventDefault();
  createTask(input.value);
}

function setTasks() {
  const tasksListString = localStorage.tasks;
  const taskListArray = tasksListString.split(",");

  taskListArray.forEach((task) => {
    if (task !== undefined && task !== "") {
      const div = document.createElement("div");
      div.classList.add("task");
      div.innerHTML = ` <p>${task}</p>
     <i class="bi bi-trash3-fill"></i>`;
      tasksContainer.appendChild(div);
    }
  });
}

setTasks();

function saveTaskOnMemory(value) {
  localStorage.tasks += `,${value}`;
}

function createTask(value) {
  if (value === "") {
    return;
  } else {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = ` <p>${value}</p>
   <i class="bi bi-trash3-fill"></i>`;
    tasksContainer.appendChild(div);
    input.value = "";
  }
  saveTaskOnMemory(value);
  refreshList();
}

function createOnEnter({ key }) {
  if (key === "enter") {
    createTask();
  }
}

function removeTaskFromMemory(target) {
  const itemToRemove = target.parentElement.innerText;

  const tasksListString = localStorage.tasks;
  const taskListArray = tasksListString.split(",");

  const taskListRefresh = taskListArray.filter((task) => {
    return task !== undefined && task !== itemToRemove;
  });

  const taskListRefreshText = taskListRefresh.join(",");
  localStorage.tasks = taskListRefreshText;
}

function deleteTask(event) {
  event.stopPropagation();
  removeTaskFromMemory(event.target);
  event.target.parentElement.remove();
}

const refreshList = () => {
  const removerList = document.querySelectorAll(".bi-trash3-fill");
  removerList.forEach((item) => {
    events.forEach((userEvent) => {
      item.addEventListener(userEvent, deleteTask);
    });
  });
};
events.forEach((event) => {
  btn.addEventListener(event, handleTaskCreator);
});

input.addEventListener("keydown", createOnEnter);

refreshList();
