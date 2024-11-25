const TODO_STATES = {
    FINISHED: 'Finished',
    NOT_FINISHED: 'Not Finish'
};
  
const BUTTON_COLORS = {
    FINISHED: '#4CAF50',
    NOT_FINISHED: '#ccc'
};
  
const DOM = {
    form: document.querySelector('#taskForm form'),
    taskList: document.querySelector('#taskList tbody'),
    clearAllButton: document.getElementById('clearAll'),
    taskInput: document.getElementById('task')
};
  
class TaskManager {
    constructor(containerElement) {
      this.container = containerElement;
    }
  
    createTaskElement(taskText, isFinished) {
      const tr = document.createElement('tr');
      tr.appendChild(this.createTaskTextCell(taskText, isFinished));
      tr.appendChild(this.createTaskControlsCell(isFinished));
      return tr;
    }
  
    createTaskTextCell(taskText, isFinished) {
      const taskTd = document.createElement('td');
      taskTd.textContent = taskText;
      taskTd.style.textDecoration = isFinished ? 'line-through' : 'none';
      return taskTd;
    }
  
    createTaskControlsCell(isFinished) {
      const statusTd = document.createElement('td');
      statusTd.appendChild(this.createStatusButton(isFinished));
      statusTd.appendChild(this.createDeleteButton());
      return statusTd;
    }
  
    createStatusButton(isFinished) {
      const button = document.createElement('button');
      button.textContent = isFinished ? TODO_STATES.FINISHED : TODO_STATES.NOT_FINISHED;
      button.classList.add('done-button');
      button.style.backgroundColor = isFinished ? BUTTON_COLORS.FINISHED : BUTTON_COLORS.NOT_FINISHED;
      
      button.addEventListener('click', () => this.toggleTaskStatus(button));
      return button;
    }
  
    createDeleteButton() {
      const button = document.createElement('button');
      button.textContent = 'Delete';
      button.classList.add('delete-button');
      button.addEventListener('click', (e) => this.deleteTask(e));
      return button;
    }
  
    toggleTaskStatus(button) {
      const taskRow = button.closest('tr');
      const taskText = taskRow.querySelector('td:first-child');
      const isNowFinished = button.textContent === TODO_STATES.NOT_FINISHED;
  
      taskText.style.textDecoration = isNowFinished ? 'line-through' : 'none';
      button.textContent = isNowFinished ? TODO_STATES.FINISHED : TODO_STATES.NOT_FINISHED;
      button.style.backgroundColor = isNowFinished ? BUTTON_COLORS.FINISHED : BUTTON_COLORS.NOT_FINISHED;
  
      this.reorderTasks();
    }
  
    deleteTask(event) {
      event.target.closest('tr').remove();
    }
  
    addTask(taskText, isFinished = false) {
      const taskElement = this.createTaskElement(taskText, isFinished);
      this.container.appendChild(taskElement);
      this.reorderTasks();
    }
  
    reorderTasks() {
      const rows = Array.from(this.container.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const aStatus = a.querySelector('.done-button').textContent === TODO_STATES.FINISHED ? 1 : 0;
        const bStatus = b.querySelector('.done-button').textContent === TODO_STATES.FINISHED ? 1 : 0;
        return aStatus - bStatus;
      });
  
      rows.forEach(row => this.container.appendChild(row));
    }
  
    clearAll() {
      this.container.innerHTML = '';
    }
}
  
const taskManager = new TaskManager(DOM.taskList);
  
DOM.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = DOM.taskInput.value.trim();
  
    if (taskText) {
      taskManager.addTask(taskText);
      DOM.taskInput.value = '';
    }
});
  
DOM.clearAllButton.addEventListener('click', () => taskManager.clearAll());