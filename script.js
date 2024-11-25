const TODO_STATES = {
    FINISHED: 'Finished',
    NOT_FINISHED: 'Not Finish'
  };
  
  const BUTTON_COLORS = {
    FINISHED: '#4CAF50',
    NOT_FINISHED: '#ccc'
  };
  
  const STORAGE_KEY = 'todoListTasks';

  const DOM = {
    form: document.querySelector('#taskForm form'),
    taskList: document.querySelector('#taskList tbody'),
    clearAllButton: document.getElementById('clearAll'),
    taskInput: document.getElementById('task')
  };
  
  class TaskManager {
    constructor(containerElement) {
      this.container = containerElement;
      this.tasks = [];
      this.loadTasks();
    }
  
    loadTasks() {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        this.renderTasks();
      } catch (error) {
        console.error('Error loading tasks:', error);
        this.tasks = [];
      }
    }
  
    saveTasks() {
      try {
        const tasksToSave = this.tasks.map(task => ({
          text: task.text,
          isFinished: task.isFinished
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    }
  
    renderTasks() {
      this.container.innerHTML = '';
      this.tasks.forEach(task => {
        const taskElement = this.createTaskElement(task.text, task.isFinished);
        this.container.appendChild(taskElement);
      });
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
      const taskIndex = Array.from(this.container.children).indexOf(taskRow);
      const taskText = taskRow.querySelector('td:first-child');
      const isNowFinished = button.textContent === TODO_STATES.NOT_FINISHED;
  
      taskText.style.textDecoration = isNowFinished ? 'line-through' : 'none';
      button.textContent = isNowFinished ? TODO_STATES.FINISHED : TODO_STATES.NOT_FINISHED;
      button.style.backgroundColor = isNowFinished ? BUTTON_COLORS.FINISHED : BUTTON_COLORS.NOT_FINISHED;
  
      this.tasks[taskIndex].isFinished = isNowFinished;
      this.saveTasks();
      this.reorderTasks();
    }
  
    deleteTask(event) {
      const taskRow = event.target.closest('tr');
      const taskIndex = Array.from(this.container.children).indexOf(taskRow);
      
      taskRow.remove();
      this.tasks.splice(taskIndex, 1);
      this.saveTasks();
    }
  
    addTask(taskText, isFinished = false) {
      this.tasks.push({ text: taskText, isFinished });
      
      const taskElement = this.createTaskElement(taskText, isFinished);
      this.container.appendChild(taskElement);
      
      this.saveTasks();
      this.reorderTasks();
    }
  
    reorderTasks() {
      this.tasks.sort((a, b) => Number(a.isFinished) - Number(b.isFinished));
      this.renderTasks();
      this.saveTasks();
    }
  
    clearAll() {
      this.container.innerHTML = '';
      this.tasks = [];
      this.saveTasks();
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