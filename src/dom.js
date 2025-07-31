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
  console.log("Current Project Todos:", todos);
  todos.forEach((todo, index) => {
    const div = document.createElement('div'); // Create a container for each todo.
    div.classList.add('todo-item'); // Add a CSS class for styling.

    div.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
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
    const input = document.createElement('input');
    input.type = 'text'; // Create an input field for the project name.
    input.placeholder = 'Enter project name';
    input.classList.add('project-input'); // Add a CSS class for styling.

    projectList.appendChild(input); // Add the input field to the project list.
    input.focus(); // Focus on the input field for immediate typing.

    const addProject = () => {
      const name = input.value.trim(); // Get the project name from the input field.
      if (name) {
        app.addProject(name); // Add the new project to the app.
        renderProjects(); // Re-render the project list.
      }
      input.remove(); // Remove the input field after adding the project.
    };

    // Add event listeners for Enter key and blur (clicking outside)
    const handleBlur = () => {
      addProject();
      input.removeEventListener('blur', handleBlur); // Remove the blur listener
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        input.removeEventListener('blur', handleBlur); // Prevent blur from triggering
        addProject();
      }
    });

    input.addEventListener('blur', handleBlur);
  });
}


function bindAddTodo() {
  const todoModal = document.getElementById('add-todo-modal');
  const todoForm = document.getElementById("add-todo-form");
  const closeTodoModal = document.getElementById("close-todo-modal");

  // show modal when the add todo button is clicked
  addTodoBtn.addEventListener("click", () => {
    todoModal.classList.remove("hidden");
  });

  // close modal when the close button is clicked
  closeTodoModal.addEventListener("click", () => {
    todoModal.classList.add("hidden");
  });

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const title = document.getElementById("todo-title").value.trim();
    const description = document.getElementById("todo-description").value.trim();
    const dueDate = document.getElementById("todo-due-date").value;
    const priority = document.getElementById("todo-priority").value;

    console.log("Adding Todo:", { title, description, dueDate, priority });

    if (title && description && dueDate && priority) {
      app.addTodoToCurrentProject({title, description, dueDate, priority}); // Add the new todo to the current project.
      renderTodos(); // Re-render the todo list.
      todoModal.classList.add("hidden"); // Hide the modal after adding the todo.
      todoForm.reset(); // Reset the form fields.
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