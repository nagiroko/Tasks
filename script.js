let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;
    
    if (taskName === '') {
        alert('Please enter a task name');
        return;
    }
    
    // Check if the task name already exists
    const existingTask = tasks.find(task => task.name.toLowerCase() === taskName.toLowerCase());
    if (existingTask) {
        alert('Task with the same name already exists');
        return;
    }

    tasks.push({ name: taskName, priority: priority });
    document.getElementById('taskName').value = '';
    sortAndRenderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    sortAndRenderTasks();
}

function sortAndRenderTasks() {
    tasks.sort((a, b) => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
            return a.name.localeCompare(b.name);
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    const priorityColors = {
        'High': 'red',
        'Medium': 'darkgoldenrod',
        'Low': 'green'
    };

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${task.name}`;
        span.style.color = priorityColors[task.priority]; // Assign color based on priority
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(index);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
}

