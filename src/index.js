import "./styles.css";
import { saveToStorage, loadFromStorage } from "./storage.js";
import app from "./logic.js";
import Project from "./Projects.js";
import Todo from "./Todo.js";


app.addProject("Project 1");
app.addProject("Project 2");
console.log("Projects after adding:", app.getProjectNames());

app.addProject("Project 3");
console.log("Projects after adding Project 3:", app.getProjectNames());


const projectToRemove = app.getProjectByName("Project 1");
app.removeProject(projectToRemove);
console.log("Projects after removing Project 1:", app.getProjectNames());


app.setCurrentProject(app.getProjectByName("Project 2"));
console.log("Current Project:", app.getCurrentProject());
const todoData = {
    title: "Todo 1",
    description: "Description for Todo 1",
    dueDate: "2023-10-01",
    priority: "High",
    completed: false,
    tags: ["work", "urgent"]
};

app.addTodoToCurrentProject(todoData);
console.log("Todos in Current Project after adding Todo 1:", app.getTodosFromCurrentProject());

const todoData2 = {
    title: "Todo 2",
    description: "Description for Todo 2",
    dueDate: "2023-10-02",
    priority: "Medium",
    completed: false,
    tags: ["personal"]
};
app.addTodoToCurrentProject(todoData2);
console.log("Todos in Current Project after adding Todo 2:", app.getTodosFromCurrentProject());


console.log("Current Project First Todo:", app.getCurrentProject().getTodo(0));

app.getCurrentProject().getTodo(0).addTag("important");
console.log("First Todo after adding tag:", app.getCurrentProject().getTodo(0));