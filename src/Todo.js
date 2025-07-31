export default class Todo {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.tags = [];
        this.tasks = []; // Initialize tasks as an empty array
    }

    toggleCompletion() {
        this.completed = !this.completed;
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        if (!this.tasks.includes(task)) {
            this.tasks.push(task);
        }
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }

    getSummary() {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            completed: this.completed,
            tags: this.tags
        };
    }
}