const API_KEY = 'c430221b0ea84a35b6f3d72234b68c7a'
const TASKS_ENDPOINT = `https://crudcrud.com/api/${API_KEY}/tasks`;

let task = (title, category, hour) => {
    return JSON.stringify({
        "title":title, 
        "category":category, 
        "hour":hour, 
        "done": false
    })
  }

async function postTask(task) {
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: task,
    }
    try {
    const response = await fetch(TASKS_ENDPOINT, options)
    return await response.json();
    } catch (error) {
    throw error;
    }
}    

function addTask() {
    const taskTitle = document.getElementById("task").value
    const taskCategory = document.getElementById("category").value
    const taskHour = document.getElementById("hour").value
    const taskObj = task(taskTitle, taskCategory, taskHour)
    postTask(taskObj)
    console.log(`Task saved! \n${taskObj}`)
  
    const modalElement = document.getElementById("taskModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
    
    fetchDataAndDisplay()
  }
  

function fetchDataAndDisplay() {
  fetch(TASKS_ENDPOINT)
  .then(response => response.json())
  .then(renderTasks)
  .catch(error => {
    console.error("Error fetching data:", error);
  });
}

function renderTasks(tasks) {
  const todoList = document.getElementById("list-items");
  todoList.innerHTML = '';
  
  if (!tasks.length) {
    todoList.innerHTML += `
    <div class="empty-card rounded-3 m-2 d-flex align-items-center justify-content-center">
      <p class="mb-0 pt-2 pb-2" style="background-color: white">Ainda não há tarefas para este dia!</p>
    </div>`
      todoList.appendChild(listItem);
  } else {
  tasks.forEach(item => {
    const checked = (item.done) ? 'checked' : ''
    todoList.innerHTML += `
    <div class="task-card rounded-3 m-2 d-flex align-items-center justify-content-between">
      <div id="task-data" class="d-flex justify-content-between p-2 align-items-center">
        <div id="task-status" class="form-check pe-2">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" ${checked}>
        </div>
      <div class="justify-content-start">
        <p class="fw-bold mb-0 task-prop">${item.title}</p>
          <div class="d-flex">
            <p class="mb-0 task-prop1">${item.category}</p>
            <i class="bi bi-dot task-prop1"></i>
            <i class="bi bi-clock task-prop1"></i>
            <p class="mb-0 ps-1 task-prop1">${item.hour}</p>
          </div>
      </div>
    </div>
      <div id="task-actions" class="p-2">
        <button id="edit-tasks-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taskModal" data-id="${item._id}">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button id="delete-tasks-btn" type="button" class="btn btn-primary" data-id="${item._id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>`
    })
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const doneButton = document.getElementById("doneButton")
  doneButton.addEventListener("click", addTask)
})
document.addEventListener("DOMContentLoaded", fetchDataAndDisplay)

