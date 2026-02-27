const API_URL = '/api/tasks';

// State Management
let tasks = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    setupEventListeners();
});

function setupEventListeners() {
    const form = document.getElementById('todoForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskId = form.dataset.editId;
        if (taskId) {
            await updateTask(taskId);
        } else {
            await createTask();
        }
    });
}

// ---- API Actions ----

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        showError('Failed to load tasks.');
    }
}

async function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status: 'PENDING' })
        });

        if (response.ok) {
            resetForm();
            await fetchTasks();
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
}

async function updateTask(id) {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            resetForm();
            await fetchTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

async function toggleTaskStatus(id, isCompleted) {
    const endpoint = `${API_URL}/${id}/complete`;
    // If we want to toggle back to pending, we might need a different endpoint or a PUT
    // But per user request we have /api/tasks/{id}/complete (PATCH)
    // For a real toggle, we'd check status and call appropriate endpoint

    try {
        const response = await fetch(endpoint, { method: 'PATCH' });
        if (response.ok) {
            await fetchTasks();
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.status === 204 || response.ok) {
            await fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

function startEditTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const form = document.getElementById('todoForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.description || '';

    form.dataset.editId = id;
    submitBtn.textContent = 'Update Task';
    submitBtn.classList.add('btn-update');

    document.getElementById('taskTitle').focus();

    // Smooth scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    const form = document.getElementById('todoForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.reset();
    delete form.dataset.editId;
    submitBtn.textContent = 'Add Task';
    submitBtn.classList.remove('btn-update');
}

// ---- UI Rendering ----

function renderTasks() {
    const container = document.getElementById('taskList');

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="check-circle-2"></i>
                <p>All caught up! Time to relax.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    container.innerHTML = '';

    // Sort: Pending first, then by updated date
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === b.status) return new Date(b.updatedAt) - new Date(a.updatedAt);
        return a.status === 'PENDING' ? -1 : 1;
    });

    sortedTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.status === 'COMPLETED' ? 'completed' : ''}`;

        div.innerHTML = `
            <input type="checkbox" class="task-checkbox" 
                ${task.status === 'COMPLETED' ? 'checked disabled' : ''} 
                onclick="toggleTaskStatus(${task.id})">
            
            <div class="task-content">
                <h3 class="task-title">${escapeHtml(task.title)}</h3>
                ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ''}
            </div>

            <div class="task-actions">
                <button class="btn-icon btn-edit" onclick="startEditTask(${task.id})" title="Edit Task">
                    <i data-lucide="pencil"></i>
                    <span>Edit</span>
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTask(${task.id})" title="Delete Task">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        `;
        container.appendChild(div);
    });

    lucide.createIcons();
}

// Helpers
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(msg) {
    alert(msg);
}
