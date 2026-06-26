// TO-DO LIST APPLICATION WITH LOCAL STORAGE

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.editingId = null;
        this.STORAGE_KEY = 'todolist_tasks';
        this.init();
    }

    // INITIALIZE APP
    init() {
        this.loadTasks();
        this.renderTasks();
        this.setupEventListeners();
        this.updateStats();
    }

    // SETUP EVENT LISTENERS
    setupEventListeners() {
        const taskInput = document.getElementById('taskInput');
        
        // Add task on Enter key
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    // ADD TASK
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const priority = document.getElementById('prioritySelect').value;
        const text = taskInput.value.trim();

        if (!text) {
            this.showToast('Please enter a task', 'warning');
            return;
        }

        if (text.length > 200) {
            this.showToast('Task is too long (max 200 characters)', 'warning');
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();

        taskInput.value = '';
        this.showToast('✅ Task added successfully', 'success');
    }

    // EDIT TASK
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.id = 'editModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">✏️ Edit Task</div>
                <div class="modal-body">
                    <input type="text" id="editInput" class="modal-input" value="${this.escapeHtml(task.text)}" maxlength="200" placeholder="Update your task...">
                    <select id="editPriority" class="modal-input">
                        <option value="low" ${task.priority === 'low' ? 'selected' : ''}>🟢 Low</option>
                        <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>🟡 Medium</option>
                        <option value="high" ${task.priority === 'high' ? 'selected' : ''}>🔴 High</option>
                    </select>
                </div>
                <div class="modal-buttons">
                    <button class="btn-modal btn-save" onclick="app.saveEdit(${id})">💾 Save</button>
                    <button class="btn-modal btn-cancel" onclick="app.closeModal()">❌ Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.getElementById('editInput').focus();

        // Close modal on Enter
        document.getElementById('editInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveEdit(id);
        });
    }

    // SAVE EDITED TASK
    saveEdit(id) {
        const newText = document.getElementById('editInput').value.trim();
        const newPriority = document.getElementById('editPriority').value;

        if (!newText) {
            this.showToast('Task cannot be empty', 'warning');
            return;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            task.priority = newPriority;
            task.updatedAt = new Date().toLocaleString();
            this.saveTasks();
            this.renderTasks();
            this.showToast('✏️ Task updated', 'success');
        }

        this.closeModal();
    }

    // CLOSE MODAL
    closeModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.remove();
        }
    }

    // TOGGLE TASK COMPLETION
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            task.updatedAt = new Date().toLocaleString();
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            
            if (task.completed) {
                this.showToast('✅ Task completed!', 'success');
            }
        }
    }

    // DELETE TASK
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showToast('🗑️ Task deleted', 'warning');
        }
    }

    // FILTER TASKS
    filterTasks(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        this.renderTasks();
    }

    // GET FILTERED TASKS
    getFilteredTasks() {
        let filtered = this.tasks;

        switch (this.currentFilter) {
            case 'completed':
                filtered = this.tasks.filter(t => t.completed);
                break;
            case 'active':
                filtered = this.tasks.filter(t => !t.completed);
                break;
            case 'high':
                filtered = this.tasks.filter(t => t.priority === 'high' && !t.completed);
                break;
            case 'all':
            default:
                filtered = this.tasks;
        }

        return filtered;
    }

    // RENDER TASKS
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        tasksList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item priority-${task.priority}${task.completed ? ' completed' : ''}`;
            taskElement.innerHTML = `
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="task-date">📅 ${task.createdAt}</span>
                        <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    </div>
                </div>
                <div class="task-buttons">
                    <button class="btn-edit" onclick="app.editTask(${task.id})" title="Edit">✏️</button>
                    <button class="btn-delete" onclick="app.deleteTask(${task.id})" title="Delete">🗑️</button>
                </div>
            `;
            tasksList.appendChild(taskElement);
        });
    }

    // UPDATE STATISTICS
    updateStats() {
        const totalCount = this.tasks.length;
        const completedCount = this.tasks.filter(t => t.completed).length;

        document.getElementById('totalCount').textContent = totalCount;
        document.getElementById('completedCount').textContent = completedCount;
    }

    // CLEAR COMPLETED TASKS
    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;

        if (completedCount === 0) {
            this.showToast('No completed tasks to clear', 'warning');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showToast(`🗑️ ${completedCount} completed task(s) cleared`, 'success');
        }
    }

    // CLEAR ALL TASKS
    clearAll() {
        if (this.tasks.length === 0) {
            this.showToast('No tasks to clear', 'warning');
            return;
        }

        if (confirm('⚠️ Delete ALL tasks? This cannot be undone!')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showToast('⚠️ All tasks cleared', 'warning');
        }
    }

    // EXPORT TASKS
    exportTasks() {
        if (this.tasks.length === 0) {
            this.showToast('No tasks to export', 'warning');
            return;
        }

        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks_${new Date().getTime()}.json`;
        link.click();

        this.showToast('💾 Tasks exported as JSON', 'success');
    }

    // SAVE TASKS TO LOCAL STORAGE
    saveTasks() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
            this.showToast('Error saving tasks', 'error');
        }
    }

    // LOAD TASKS FROM LOCAL STORAGE
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.tasks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.tasks = [];
        }
    }

    // SHOW TOAST NOTIFICATION
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // ESCAPE HTML SPECIAL CHARACTERS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// INITIALIZE APP WHEN DOM IS READY
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TodoApp();
});
