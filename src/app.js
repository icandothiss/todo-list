//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
var todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todo");
const deleteButton = document.getElementsByClassName("button-5");
const cleanAll = document.getElementById("deleteButton");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
cleanAll.addEventListener("click", deleteAll);

//Functions
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    return;
  }
  // to do DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STORAGE
  saveLocalTodos(todoInput.value);
  //CHECK MARK BUTTON*
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK trash BUTTON*
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    removeLocalTodos(todo);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  const selectors = e.target;
  if (selectors.value === "uncompleted") {
    todoInput.style.display = "flex";
    deleteButton[0].style.display = "none";
    todos.forEach((element) => {
      if ([...element.classList].includes("completed")) {
        element.style.display = "none";
      } else if (![...element.classList].includes("completed")) {
        element.style.display = "flex";
      }
    });
  } else if (selectors.value === "completed") {
    todoInput.style.display = "none";
    deleteButton[0].style.display = "flex";
    todos.forEach((element) => {
      if (![...element.classList].includes("completed")) {
        element.style.display = "none";
      } else if ([...element.classList].includes("completed")) {
        element.style.display = "flex";
      }
    });
  } else if (selectors.value === "all") {
    todoInput.style.display = "flex";
    deleteButton[0].style.display = "none";
    todos.forEach((element) => {
      element.style.display = "flex";
    });
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // to do DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON*
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  indexes = todo.children[0].innerText;
  todos.splice(todos.indexOf(indexes), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAll() {
  let todos = todoList.children;
  let list = [];
  for (let i = 0; i < todos.length; i++) {
    list.push(todos[i]);
  }
  let result = list.filter((word) => [...word.classList].includes("completed"));
  for (let i = 0; i < result.length; i++) {
    result[i].remove();
  }
  removeStorageTodos(list);
}
function removeStorageTodos(element) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let completed = [];
  let index = [];
  for (let i = 0; i < element.length; i++) {
    if ([...element[i].classList].includes("completed")) {
      completed.push(element[i]);
      index.push(i);
    }
  }
  // swapping targeted items with random word
  for (let i = 0; i < index.length; i++) {
    todos.splice(index[i], 1, "cute");
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}
