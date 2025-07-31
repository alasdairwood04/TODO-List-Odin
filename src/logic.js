import Project from './Projects.js';
import Todo from './Todo.js';
import { saveToStorage, loadFromStorage } from './storage.js';

class AppController {
    constructor() {
        this.projects = loadFromStorage();
        this.currentProject = null;
    }

    // Initializes the application with a list of projects
    // If no projects are provided, it creates a default project
    init(projects) {
        this.projects = projects;
        this.currentProject = projects[0] || null; // Set the first project as the current project, if any
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

    getTasksFromCurrentProject() {
        return this.currentProject ? this.currentProject.getTasks() : [];
    }

    addProjectTask(projectName, task) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.addTask(task);
            saveToStorage(this.projects);
        } else {
            console.error(`Project with name ${projectName} not found.`);
        }
    }

    removeProjectTask(projectName, task) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.removeTask(task);
            saveToStorage(this.projects);
        } else {
            console.error(`Project with name ${projectName} not found.`);
        }
    }

    getAllProjects() {
        return this.projects;
    }
}

const app = new AppController();
export default app;