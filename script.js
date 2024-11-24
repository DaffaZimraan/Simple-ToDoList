const form = document.querySelector('#taskForm form');
const taskList = document.querySelector('#taskList tbody');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if(taskText){
        const tr = document.createElement('tr');
        const taskTd = document.createElement('td');
        taskTd.textContent = taskText;

        const statusTd = document.createElement('td');
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Not Finish';
        doneButton.classList.add('done-button');

        doneButton.addEventListener('click', function() {
            if (doneButton.textContent === 'Not Finish') {
                taskTd.style.textDecoration = 'line-through'; 
                doneButton.textContent = 'Finished'; 
                doneButton.style.backgroundColor = '#4CAF50'; 
            } else {
                taskTd.style.textDecoration = 'none'; 
                doneButton.textContent = 'Not Finish'; 
                doneButton.style.backgroundColor = '#ccc'; 
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function () {
            tr.remove(); 
        });

        statusTd.appendChild(doneButton);
        statusTd.appendChild(deleteButton);

        tr.appendChild(taskTd);
        tr.appendChild(statusTd);

        taskList.appendChild(tr);
        taskInput.value = ''; 
    }
});