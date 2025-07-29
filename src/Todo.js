export default class Todo {
    constructor(title, description, dueDate, priority, completed = false, tags = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.tags = tags;
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