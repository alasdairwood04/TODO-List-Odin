import './styles.css';
import { loadFromStorage } from './storage.js';
import app from './logic.js';
import { initDOM } from './dom.js';
import Project from './Projects.js'; // Import the Project class




document.addEventListener('DOMContentLoaded', () => {
  const storedProjects = loadFromStorage();
  app.init(storedProjects.length ? storedProjects : [new Project('Default')]);
  initDOM();
});