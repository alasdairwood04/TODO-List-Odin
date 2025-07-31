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

    // Create the innerHTML for the todo item
    div.innerHTML = `
      <div class="title">
        <h3>${todo.title}</h3>
        <button class="edit-todo" data-index="${index}">Edit</button>
      </div>
      <div class="details">
        <p>${todo.description}</p>
        <p>Due: ${todo.dueDate}</p>
        <p>Priority: ${todo.priority}</p>
        <div class="tasks">
          ${todo.tasks
            .map(
              (task, taskIndex) => `
              <div class="task">
                <input type="checkbox" id="task-${index}-${taskIndex}">
                <label for="task-${index}-${taskIndex}">${task}</label>
              </div>
            `
            )
            .join('')}
        </div>
        <div class="tags">
          ${todo.tags
            .map(
              (tag) => `<span class="tag">${tag}</span>`
            )
            .join('')}
      </div>
    `;

    // Add event listener for the Edit button
    const editBtn = div.querySelector('.edit-todo');
    editBtn.addEventListener('click', () => {
      showDropdownMenu(editBtn, todo, index); // Show the dropdown menu
    });

    todoList.appendChild(div); // Add the todo container to the todo list.
  });
}

function showDropdownMenu(button, todo, index) {
  // Check if a dropdown already exists for this button
  let dropdown = button.nextElementSibling;

  if (dropdown && dropdown.classList.contains('dropdown-menu')) {
    // If the dropdown exists, toggle the hidden class
    dropdown.classList.toggle('hidden');
    return; // Exit the function
  }

  // Remove any other dropdown menus
  document.querySelectorAll('.dropdown-menu').forEach((menu) => menu.remove());

  // Create the dropdown menu
  dropdown = document.createElement('div');
  dropdown.classList.add('dropdown-menu', 'hidden'); // Start with the hidden class
  dropdown.innerHTML = `
    <button class="dropdown-option" data-action="edit-title">Edit Title</button>
    <button class="dropdown-option" data-action="edit-description">Edit Description</button>
    <button class="dropdown-option" data-action="add-checkboxes">Add Checkboxes</button>
    <button class="dropdown-option" data-action="add-tags">Add Tags</button>
    <button class="dropdown-option" data-action="delete-todo">Delete Todo</button>
  `;

  // Append the dropdown to the button's parent
  button.parentElement.appendChild(dropdown);

  // Position the dropdown relative to the button
  const rect = button.getBoundingClientRect();
  dropdown.style.setProperty('--dropdown-top', `${rect.bottom + window.scrollY}px`);
  dropdown.style.setProperty('--dropdown-left', `${rect.left + window.scrollX - 20}px`);

  // Remove the hidden class to make it visible
  dropdown.classList.remove('hidden');

  // Add event listeners for dropdown options
  dropdown.querySelectorAll('.dropdown-option').forEach((option) => {
    option.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      handleDropdownAction(action, todo, index);
      dropdown.remove(); // Remove the dropdown after an action is selected
    });
  });

  // Add event listeners for clicking outside or blurring
  const handleBlur = () => {
    dropdown.remove(); // Remove the dropdown when clicking outside
    document.removeEventListener('click', handleBlur); // Clean up the event listener
  };

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== button) {
      handleBlur();
    }
  });
}


function handleDropdownAction(action, todo, index) {
  switch (action) {
    case 'edit-title':
      const titleElement = document.querySelectorAll('.title h3')[index]; // Get the title element for the specific todo

      // Create an input field for the new title
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = todo.title; // Pre-fill with the current title
      titleInput.classList.add('title-input'); // Add a CSS class for styling

      // Replace the title element with the input field
      titleElement.replaceWith(titleInput);
      titleInput.focus(); // Focus on the input field for immediate typing

      const updateTitle = () => {
        const newTitle = titleInput.value.trim(); // Get the new title from the input field
        if (newTitle) {
          todo.title = newTitle; // Update the todo object
          renderTodos(); // Re-render the todos
        } else {
          renderTodos(); // Re-render to restore the original title if input is empty
        }
      };

      // Add event listeners for Enter key and blur (clicking outside)
      titleInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          updateTitle();
        }
      });

      titleInput.addEventListener('blur', updateTitle);
      break;

    case 'edit-description':
      const descriptionElement = document.querySelectorAll('.details p')[index * 3]; // Get the description element for the specific todo

      // Create an input field for the new description
      const descriptionInput = document.createElement('input');
      descriptionInput.type = 'text';
      descriptionInput.value = todo.description; // Pre-fill with the current description
      descriptionInput.classList.add('description-input'); // Add a CSS class for styling

      // Replace the description element with the input field
      descriptionElement.replaceWith(descriptionInput);
      descriptionInput.focus(); // Focus on the input field for immediate typing

      const updateDescription = () => {
        const newDescription = descriptionInput.value.trim(); // Get the new description from the input field
        if (newDescription) {
          todo.description = newDescription; // Update the todo object
          renderTodos(); // Re-render the todos
        } else {
          renderTodos(); // Re-render to restore the original description if input is empty
        }
      };

      // Add event listeners for Enter key and blur (clicking outside)
      descriptionInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          updateDescription();
        }
      });

      descriptionInput.addEventListener('blur', updateDescription);
      break;

    case 'add-tags':
      const tagsContainer = document.querySelectorAll('.tags')[index]; // Get the tags container for the specific todo

      // Create an input field for the new tag
      const tagInput = document.createElement('input');
      tagInput.type = 'text';
      tagInput.placeholder = 'Enter new tag';
      tagInput.classList.add('tag-input'); // Add a CSS class for styling

      // Append the input field to the tags container
      tagsContainer.appendChild(tagInput);
      tagInput.focus(); // Focus on the input field for immediate typing

      const addTag = () => {
        const newTag = tagInput.value.trim(); // Get the new tag from the input field
        if (newTag) {
          todo.addTag(newTag); // Use the `addTag` method from the `Todo` class
          renderTodos(); // Re-render the todos
        }
        tagInput.remove(); // Remove the input field after adding the tag
      };

      // Add event listeners for Enter key and blur (clicking outside)
      tagInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          addTag();
        }
      });

      tagInput.addEventListener('blur', addTag);
      break;

    case 'add-checkboxes':
      const tasksContainer = document.querySelectorAll('.tasks')[index]; // Get the tasks container for the specific todo

      // Create an input field for the new task
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter task name';
      input.classList.add('task-input'); // Add a CSS class for styling

      // Append the input field to the tasks container
      tasksContainer.appendChild(input);
      input.focus(); // Focus on the input field for immediate typing

      const addTask = () => {
        const taskName = input.value.trim(); // Get the task name from the input field
        if (taskName) {
          // Create a new task element
          const taskDiv = document.createElement('div');
          taskDiv.classList.add('task');
          taskDiv.innerHTML = `
            <input type="checkbox" id="task-${index}-${tasksContainer.children.length}">
            <label for="task-${index}-${tasksContainer.children.length}">${taskName}</label>
          `;

          // Append the new task to the tasks container
          tasksContainer.appendChild(taskDiv);

          // Add the task to the todo object
          todo.addTask(taskName); // Use the `addTask` method from the `Todo` class
          console.log(`Added task: ${taskName}`);
        }
        input.remove(); // Remove the input field after adding the task
      };

      // Add event listeners for Enter key and blur (clicking outside)
      const handleBlur = () => {
        addTask();
        input.removeEventListener('blur', handleBlur); // Remove the blur listener
      };

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.removeEventListener('blur', handleBlur); // Prevent blur from triggering
          addTask();
        }
      });

      input.addEventListener('blur', handleBlur);
      break;

      case 'delete-todo':
      app.removeTodoFromCurrentProject(todo); // Remove the todo from the current project.
      renderTodos(); // Re-render the todo list. 
    }
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