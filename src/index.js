import './styles.css';
import { loadFromStorage } from './storage.js';
import app from './logic.js';
import { initDOM } from './dom.js';
import Project from './Projects.js';
import Todo from './Todo.js';

document.addEventListener('DOMContentLoaded', () => {
  const storedProjects = loadFromStorage();

  // If there are no stored projects, populate with some default data
  if (storedProjects.length === 0) {
    const defaultProject = new Project('Personal');
    const workProject = new Project('Work');

    defaultProject.addTodo(new Todo(
      'Organize closet',
      'Go through clothes and donate what is not needed.',
      '2025-08-15',
      'medium'
    ));

    defaultProject.addTodo(new Todo(
      'Plan weekend trip',
      'Research destinations and book accommodation.',
      '2025-08-08',
      'high'
    ));

    workProject.addTodo(new Todo(
      'Finish project report',
      'Finalize the Q3 report and send it to the manager.',
      '2025-08-05',
      'high'
    ));
    
    app.init([defaultProject, workProject]);
  } else {
    // Otherwise, load the stored projects
    app.init(storedProjects);
  }

  initDOM();
});