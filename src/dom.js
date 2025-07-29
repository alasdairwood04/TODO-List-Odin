import app from './logic.js';

const projectList = document.querySelector('#project-list');
const todoList = document.querySelector('#todo-list');
const addProjectBtn = document.querySelector('#add-project-btn');
const addTodoBtn = document.querySelector('#add-todo-btn');

function renderProjects() {
    projectList.innerHTML = '';
    const projects = app.getAllProjects();
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.textContent = project.name;
        projectItem.addEventListener('click', () => {
            app.setCurrentProject(project);
            renderTodos();
        });
        projectList.appendChild(projectItem);
    });
}

function renderTodos() {
    todoList.innerHTML = '';
    const todos = app.getCurrentProject().getTodos();
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.textContent = todo.title;
        todoList.appendChild(todoItem);
    });
}

function initDOM() {
    console.log("DOM initialized");
    
    // Initial render of projects and todos
    renderProjects();
    
    // Event listeners for buttons
    addProjectBtn.addEventListener('click', () => {
        const projectName = prompt("Enter project name:");
        if (projectName) {
            app.addProject(projectName);
            renderProjects();
        }
    });

    addTodoBtn.addEventListener('click', () => {
        const todoTitle = prompt("Enter todo title:");
        if (todoTitle && app.getCurrentProject()) {
            app.addTodoToCurrentProject({ title: todoTitle });
            renderTodos();
        } else {
            alert("Please select a project first.");
        }
    });
}

export { initDOM };