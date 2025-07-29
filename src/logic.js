import Project from './Projects.js';
import Todo from './Todo.js';
import { saveToStorage, loadFromStorage } from './storage.js';

class AppController {
    constructor() {
        this.projects = loadFromStorage();
        this.currentProject = null;
    }

    addProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        saveToStorage(this.projects);
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        console.log("index:", index);
        if (index !== -1) {
            this.projects.splice(index, 1);
        }
        saveToStorage(this.projects);
    }

    setCurrentProject(project) {
        this.currentProject = project;
    }

    getCurrentProject() {
        return this.currentProject;
    }

    addTodoToCurrentProject(todoData) {
        const todo = new Todo(
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority,
            todoData.completed,
            todoData.tags
        );
        this.currentProject.addTodo(todo);
        saveToStorage(this.projects);
    }

    removeTodoFromCurrentProject(todo) {
        if (this.currentProject) {
            this.currentProject.removeTodo(todo);
            saveToStorage(this.projects);
        }
    }

    getTodosFromCurrentProject() {
        return this.currentProject ? this.currentProject.getTodos() : [];
    }

    getProjectNames() {
        return this.projects.map(project => project.name);
    }

    getProjectByName(name) {
        return this.projects.find(project => project.name === name);
    }

    getAllProjects() {
        return this.projects;
    }
}

const app = new AppController();
export default app;