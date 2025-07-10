const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');

function loadTasks() {
  fetch('http://localhost:8000/api/tasks')
    .then(res => res.json())
    .then(data => {
      taskContainer.innerHTML = '';

      for (const status in data) {
        const group = document.createElement('div');
        group.classList.add('task-group');

        const heading = document.createElement('h3');
        heading.innerText = status.replace('_', ' ').toUpperCase();
        group.appendChild(heading);

        data[status].forEach(task => {
          const div = document.createElement('div');
          div.className = 'task';
          div.innerHTML = `
            <small><strong>Task ID: ${task.id}</strong></small><br>
            <strong>${task.title}</strong><br>
            ${task.description || ''}<br><br>
          `;
          group.appendChild(div);
        });

        taskContainer.appendChild(group);
      }
    })
    .catch(err => {
      console.error('Error loading tasks:', err);
      taskContainer.innerHTML = `<p style="color:red;">Failed to load tasks.</p>`;
    });
}


if (taskContainer) {
  loadTasks();
}

if (taskForm) {
  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const newTask = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      assigned_user_id: document.getElementById('userId').value,
      project_id: document.getElementById('projectId').value
    };

    fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create task');
        return res.json();
      })
      .then(data => {
        alert('Task added successfully!');
        taskForm.reset();
      })
      .catch(err => {
        console.error('Error adding task:', err);
        alert('Failed to add task.');
      });
  });
}
