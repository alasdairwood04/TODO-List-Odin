import Project from './Projects.js';
import Todo from './Todo.js';

function saveToStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromStorage() {
  const data = localStorage.getItem('todoProjects');
  if (!data) return [];

  const raw = JSON.parse(data);
  return raw.map(projectData => {
    const project = new Project(projectData.name);
    projectData.todos.forEach(todo =>
      project.addTodo(new Todo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.priority,
        todo.notes,
        todo.checklist,
        todo.completed
      ))
    );
    return project;
  });
}


export { saveToStorage, loadFromStorage };