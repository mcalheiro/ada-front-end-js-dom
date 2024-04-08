const API_KEY = '1cde4cec99d849f289fff280294a645e'
const TASKS_URL = `https://crudcrud.com/api/${API_KEY}/tasks`;
let editId = ""

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
    const response = await fetch(TASKS_URL, options)
    if (response.ok) {
      fetchDataAndDisplay()
    }
    return await response.json();
    } catch (error) {
    throw error;
    }
}    

function addTask() {
    const taskTitle = document.getElementById("task").value.trim()
    const taskCategory = document.getElementById("category").value.trim()
    const taskHour = document.getElementById("hour").value.trim()

    if (taskTitle === '' || taskCategory === '' || taskHour === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const taskObj = task(taskTitle, taskCategory, taskHour)
    postTask(taskObj)
    console.log(`Task saved! \n${taskObj}`)
  
    const modalElement = document.getElementById("taskModal")
    const modal = bootstrap.Modal.getInstance(modalElement)
    modal.hide()
  }
  

function fetchDataAndDisplay() {
  fetch(TASKS_URL)
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
  } else {
  tasks.forEach(item => {
    const checked = (item.done) ? 'checked' : ''
    todoList.innerHTML += `
    <div class="task-card rounded-3 m-2 d-flex align-items-center justify-content-between">
      <div id="task-data" class="d-flex justify-content-between p-3 align-items-center">
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
      <div id="task-actions" class="p-3">\
        <button id="edit-task-btn" type="button" class="btn btn-primary" data-bs-toggle="modal data-bs-target="#taskModal" task=${JSON.stringify(item)}>
          <i class="bi bi-pencil-square"></i>
        </button>
        <button id="delete-task-btn" type="button" class="btn btn-primary" task-id="${item._id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>`
    })
    addDeleteButtonListeners()
    addEditButtonListeners()
  }
}

function addDeleteButtonListeners() {
  const deleteButtons = document.querySelectorAll("#delete-task-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("task-id");
      deleteTask(taskId);
    });
  });
}


function addEditButtonListeners() {
  const editButtons = document.querySelectorAll("#edit-task-btn");
  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const taskObj = JSON.parse(button.getAttribute("task"));
      const modal = new bootstrap.Modal(document.getElementById('editModal'));
      modal.show();
      document.getElementById('edit-task').value = taskObj.title;
      document.getElementById('edit-category').value = taskObj.category;
      document.getElementById('edit-hour').value = taskObj.hour;
      editId = taskObj._id
    });
  });
}

function deleteTask(taskId) {
  fetch(`${TASKS_URL}/${taskId}`, {
    method: "DELETE"
  })
  .then(response => {
    if (response.ok) {
      console.log(`Task ${taskId} deleted successfully`);
      fetchDataAndDisplay();
    } else {
      console.error("Failed to delete task:", response.statusText);
    }
  })
  .catch(error => {
    console.error("Error deleting task:", error);
  });
}

async function putTask(taskId, updatedTask) {
  const options = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: updatedTask,
  };

  try {
      const response = await fetch(`${TASKS_URL}/${taskId}`, options);
      if (response.ok) {
          // console.log(`Task ${taskId} updated successfully`);
          fetchDataAndDisplay()
      } else {
          console.error("Failed to update task:", response.statusText);
      }
  } catch (error) {
      console.error("Error updating task:", error);
  }
}

function editTask(taskId) {
  const taskTitle = document.getElementById("edit-task").value.trim()
  const taskCategory = document.getElementById("edit-category").value.trim()
  const taskHour = document.getElementById("edit-hour").value.trim()

  if (taskTitle === '' || taskCategory === '' || taskHour === '') {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const taskObj = task(taskTitle, taskCategory, taskHour)
  putTask(taskId, taskObj)
  console.log(`Task saved! \n${taskObj}`)

  const modalElement = document.getElementById("editModal")
  const modal = bootstrap.Modal.getInstance(modalElement)
  modal.hide()
}

document.addEventListener("DOMContentLoaded", function() {
  const doneButton = document.getElementById("doneButton")
  doneButton.addEventListener("click", addTask)
})

document.addEventListener("DOMContentLoaded", function() {
  const doneButton = document.getElementById("edit-save")
  doneButton.addEventListener("click", function() {
    editTask(editId);
  });
})

document.addEventListener("DOMContentLoaded", fetchDataAndDisplay)