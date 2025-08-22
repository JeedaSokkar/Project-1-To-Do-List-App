const ul = document.getElementById("list");
const btn = document.getElementById("btn");
let task = document.getElementById("task");

function loadTasks() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("task_")) {
      try {
        const taskObj = JSON.parse(localStorage.getItem(key));
        createTaskElement(taskObj, key);
      } catch (e) {
        console.warn(` invalid task in localStorage: ${key}`);
      }
    }
  }
}

function addTask() {
  btn.onclick = function () {
    if (task.value.trim() !== "") {
      const taskObj = { text: task.value, completed: false };
      const key = "task_" + Date.now();
      localStorage.setItem(key, JSON.stringify(taskObj));
      createTaskElement(taskObj, key);
      task.value = "";
    } else {
      alert("Empty task");
    }
  };
}
function createTaskElement(taskObj, key) {
  let li = document.createElement("li");
  li.classList.add("liItem");

  let span = document.createElement("span");
  span.textContent = taskObj.text;
  span.style.textDecoration = taskObj.completed ? "line-through" : "none";


  let check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("checkinput");
  check.checked = taskObj.completed;
 
  let removeElement = document.createElement("button");
  removeElement.classList.add("removebtn");
  removeElement.textContent = "Delete";

  check.onchange = function () {
    taskObj.completed = check.checked;

    localStorage.setItem(key, JSON.stringify(taskObj));
      span.style.textDecoration = taskObj.completed ? "line-through" : "none";

  };

  removeElement.onclick = function () {
    li.remove();
    localStorage.removeItem(key);
  };

  li.append(check);
  li.append(span);
  li.append(removeElement);
  ul.appendChild(li);
}

loadTasks();
addTask();
