const form = document.querySelector('#taskForm form');
const taskList = document.querySelector('#taskList tbody');
const clearAllButton = document.getElementById('clearAll');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTask(taskText, false); 
        taskInput.value = ''; 
    }
});

function addTask(taskText, isFinished) {
    const tr = document.createElement('tr');
    const taskTd = document.createElement('td');
    taskTd.textContent = taskText;

    if (isFinished) {
        taskTd.style.textDecoration = 'line-through';
    }

    const statusTd = document.createElement('td');
    const doneButton = document.createElement('button');
    doneButton.textContent = isFinished ? 'Finished' : 'Not Finish';
    doneButton.classList.add('done-button');
    doneButton.style.backgroundColor = isFinished ? '#4CAF50' : '#ccc';

    doneButton.addEventListener('click', function() {
        const isNowFinished = doneButton.textContent === 'Not Finish';
        taskTd.style.textDecoration = isNowFinished ? 'line-through' : 'none';
        doneButton.textContent = isNowFinished ? 'Finished' : 'Not Finish';
        doneButton.style.backgroundColor = isNowFinished ? '#4CAF50' : '#ccc';
        reorderTasks(); 
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', function() {
        tr.remove();
    });

    statusTd.appendChild(doneButton);
    statusTd.appendChild(deleteButton);

    tr.appendChild(taskTd);
    tr.appendChild(statusTd);

    taskList.appendChild(tr);
    reorderTasks(); 
}

function reorderTasks() {
    const rows = Array.from(taskList.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const aStatus = a.querySelector('.done-button').textContent === 'Finished' ? 1 : 0;
        const bStatus = b.querySelector('.done-button').textContent === 'Finished' ? 1 : 0;
        return aStatus - bStatus; 
    });

    rows.forEach(row => taskList.appendChild(row)); 
}

clearAllButton.addEventListener('click', function() {
    taskList.innerHTML = ''; 
});
