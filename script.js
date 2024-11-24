const form = document.querySelector('#taskForm form');
const taskList = document.querySelector('#taskList tbody');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if(taskText){
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = taskText;
        tr.appendChild(td);
        taskList.appendChild(tr);
        taskInput.value = ''; 
    }
});