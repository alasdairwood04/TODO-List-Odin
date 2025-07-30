import app from './logic.js';

const projectList = document.querySelector('#project-list');
const todoList = document.querySelector('#todo-list');
const addProjectBtn = document.querySelector('#add-project-button');
const addTodoBtn = document.querySelector('#add-todo-button');

function renderProjects() {
  projectList.innerHTML = ''; // Clear the project list.

  app.getAllProjects().forEach((project, index) => {
    const btn = document.createElement('button'); // Create a button for each project.
    btn.textContent = project.name; // Set the button text to the project's name.
    btn.classList.add('project-btn'); // Add a CSS class for styling.

    if (project === app.getCurrentProject()) {
      btn.classList.add('active'); // Highlight the current project.
    }

    btn.addEventListener('click', () => {
      app.setCurrentProject(project); // Set the clicked project as the current project.
      renderProjects(); // Re-render the project list to update the active project.
      renderTodos(); // Re-render the todos for the new current project.
    });

    projectList.appendChild(btn); // Add the button to the project list.
  });
}

function renderTodos() {
  todoList.innerHTML = ''; // Clear the todo list.

  const todos = app.getTodosFromCurrentProject(); // Get todos from the current project.
  todos.forEach((todo, index) => {
    const div = document.createElement('div'); // Create a container for each todo.
    div.classList.add('todo-item'); // Add a CSS class for styling.

    div.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <button data-index="${index}" class="delete-todo">Delete</button>
    `; // Add todo details and a delete button.

    const delBtn = div.querySelector('.delete-todo');
    delBtn.addEventListener('click', () => {
      app.removeTodoFromCurrentProject(todo); // Remove the todo from the current project.
      renderTodos(); // Re-render the todo list.
    });

    todoList.appendChild(div); // Add the todo container to the todo list.
  });
}

function bindAddProject() {
  addProjectBtn.addEventListener('click', () => {
    const name = prompt('Enter new project name:'); // Prompt the user for a project name.
    if (name) {
      app.addProject(name); // Add the new project to the app.
      renderProjects(); // Re-render the project list.
    }
  });
}

function bindAddTodo() {
  addTodoBtn.addEventListener('click', () => {
    const title = prompt('Title:'); // Prompt the user for the todo title.
    const description = prompt('Description:'); // Prompt for the description.
    const dueDate = prompt('Due Date (YYYY-MM-DD):'); // Prompt for the due date.
    const priority = prompt('Priority (Low/Medium/High):'); // Prompt for the priority.

    if (title && dueDate && priority) {
      app.addTodoToCurrentProject({ title, description, dueDate, priority }); // Add the new todo to the current project.
      renderTodos(); // Re-render the todo list.
    }
  });
}

function initDOM() {
  bindAddProject();
  bindAddTodo();
  renderProjects();
  renderTodos();
}

export { renderProjects, renderTodos, initDOM };