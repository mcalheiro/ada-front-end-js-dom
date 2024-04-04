// INÍCIO DO CÓDIGO GIOVANNA

let listaDeTarefas = [];

// Função para adicionar uma tarefa à lista
function adicionarTarefa(tarefa) {
    listaDeTarefas.push(tarefa);
}

// Função para editar uma tarefa existente
function editarTarefa(indice, novaDescricao) {
    if (indice >= 0 && indice < listaDeTarefas.length) {
        listaDeTarefas[indice] = novaDescricao;
    } else {
        console.log("Índice de tarefa inválido.");
    }
}

// Função para remover uma tarefa da lista
function removerTarefa(indice) {
    if (indice >= 0 && indice < listaDeTarefas.length) {
        listaDeTarefas.splice(indice, 1);
    } else {
        console.log("Índice de tarefa inválido.");
    }
}


// Função para listar todas as tarefas
function listarTarefas() {
    console.log("Tarefas:");
    listaDeTarefas.forEach((tarefa, indice) => {
        console.log(`${indice + 1}. ${tarefa}`);
    });
}

// FINAL DO CÓDIGO GIOVANNA

const TASKS_ENDPOINT = 'https://crudcrud.com/api/4f1a001aa5e4410eb95f1b9901cb2061/tasks';

// This is a template for a task
let task = (title, category, hour) => {
    return {
        "title":title, 
        "category":category, 
        "hour":hour, 
        "done": false
    }
}

// Create task in CRUDCRUD
function createTask(task) {
    fetch(TASKS_ENDPOINT, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({task})
    })
    .then(response => response.json())
    .then(data => console.log(data))
}
    
// Read all tasks from CRUDCRUD
function fetchAllTasks() {
    fetch(TASKS_ENDPOINT)
    .then(response => response.json())
    .then(data => console.log(data))
}

// Read one task from CRUDCRUD, given its ID
function fetchOneTask(id) {
    return fetch(`${TASKS_ENDPOINT}/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch task');
            }
            return response.json();
        })
        .then(data => {
            return data; // Return the parsed JSON data
        });
}

// Update task in CRUDCRUD
function updateTask(id, title="", category="", hour="") {

    fetch(`${TASKS_ENDPOINT}/${id}`,
    {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'PUT',
          body: JSON.stringify({
            // FILL THE BODY HERE
          })
        })
        .then(response => console.log(response))
}

// Edit task 

// Delete task
function deleteTask(id) {
    fetch(`${TASKS_ENDPOINT}/${id}`,{
          method: 'DELETE'
        })
        .then(response => console.log(response))
}

// deleteTask("660857c61492af03e8f10ebc")
console.log(fetchOneTask("660858081492af03e8f10ec2"))