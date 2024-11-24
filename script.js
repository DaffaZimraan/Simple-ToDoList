const form = document.querySelector('#taskForm form');
const taskList = document.querySelector('#taskList ul');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if(taskText){
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        taskInput.value = '';
    }
});