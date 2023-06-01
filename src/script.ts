
import './style.css'

const btn: HTMLButtonElement | null = document.querySelector("button");
const input: HTMLInputElement | null = document.querySelector("input");
const tasksContainer: HTMLElement | null = document.querySelector(".tasks-container");



function handleTaskCreator(event: PointerEvent | MouseEvent) {
    event.preventDefault();
  if (event instanceof PointerEvent || event instanceof MouseEvent) {
    createTask(input?.value);
  }

}

const tasksList: string = localStorage.tasks;



function setTasks() {
  const taskListArray:string[] = tasksList.split(",");
  taskListArray.forEach((task: string) => {
    if (task !== "undefined" && task !== "") {
      const div = document.createElement("div");
      div.classList.add("task");
      div.innerHTML = ` <p>${task}</p>
           <i class="bi bi-trash3-fill"></i>`;
      tasksContainer?.appendChild(div);
         const trashElement: NodeListOf<Element> = div.querySelectorAll(".bi-trash3-fill");
      trashElement.forEach((trash: Element) => {
        trash.addEventListener('click', deleteTask);
      });
    }
    
  });
}

if (tasksList !== undefined) {
  setTasks();
  
} else {
  localStorage.setItem("tasks", "");
  
}

function saveTaskOnMemory(value: string) {
  if (localStorage.tasks !== undefined) {
    localStorage.tasks += `${value.trim()},`;
  }
}

function createTask(value?: string) {
  if (value === "") {
    return;
  } else {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = ` <p>${value}</p>
   <i class="bi bi-trash3-fill"></i>`;
   tasksContainer?.appendChild(div);
       const trash: HTMLElement | null = div.querySelector(".bi-trash3-fill");
   if (trash) {
     trash.addEventListener('click', deleteTask);
   }
   
    if (input) {
       input.value = "";
    }
   
  }
  saveTaskOnMemory(value ?? '');

}

function createOnEnter(e: KeyboardEvent) {
  
  if (e.key === "enter") {
    createTask();
  }
}

function removeTaskFromMemory(target: HTMLElement) {
  const itemToRemove = target?.parentElement?.innerText.trim();
  const tasksListString = localStorage.tasks;
  const taskListArray = tasksListString.split(",");
  const taskListRefresh = taskListArray.filter((task: string) => {
     return task !== "" && !task.includes(itemToRemove ?? '');
  });
  const taskListRefreshText = taskListRefresh.join(",");
  localStorage.tasks = taskListRefreshText;
}

function deleteTask(event: Event) {
  event.stopPropagation();
  
  if (event instanceof MouseEvent || event instanceof TouchEvent) {
    if (event.target instanceof HTMLElement) {
      event?.target?.parentElement?.remove()
      removeTaskFromMemory(event.target)
    }
  }

}



  btn?.addEventListener('click', handleTaskCreator);


input?.addEventListener("keydown", createOnEnter);

