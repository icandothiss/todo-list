//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
//Functions

function addTodo(event) {
  event.preventDefault();
  // to do DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
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
    console.log(todo);
    //Animation
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
  console.log();
  if (selectors.value === "uncompleted") {
    console.log("completed");
    todos.forEach((element) => {
      if ([...element.classList].includes("completed")) {
        element.style.display = "none";
      } else if (![...element.classList].includes("completed")) {
        element.style.display = "flex";
      }
    });
  } else if (selectors.value === "completed") {
    console.log("uncompleted");
    todos.forEach((element) => {
      if (![...element.classList].includes("completed")) {
        element.style.display = "none";
      } else if ([...element.classList].includes("completed")) {
        element.style.display = "flex";
      }
    });
  } else if (selectors.value === "all") {
    todos.forEach((element) => {
      element.style.display = "flex";
    });
  }
}
