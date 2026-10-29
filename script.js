console.log('sprint test');

let taskInput = document.getElementById('taskInput');
let addButton = document.getElementById('addButton');
let taskList = document.getElementById('taskList');

const storageKey = 'todoTasks';
let tasks = JSON.parse(localStorage.getItem(storageKey) || '[]').map((task) =>
    typeof task === 'string' ? { text: task, completed: false } : task
);

function saveTasks() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function renderList() {
    taskList.innerText = '';

    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        let taskText = document.createElement('span');
        taskText.innerText = task.text;
        if (task.completed) {
            taskText.classList.add('completed-task');
        }

        let taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        let completeButton = document.createElement('button');
        completeButton.innerText = task.completed ? 'Batalkan' : 'Selesai';
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => {
            toggleTask(index);
        });

        let button = document.createElement('button');
        button.innerText = 'Delete'
        button.classList.add('delete-button')
        button.addEventListener('click', ()=>{
            deleteTask(index);
        })

        taskActions.appendChild(completeButton);
        taskActions.appendChild(button);
        li.appendChild(taskText);
        li.appendChild(taskActions);
        
        taskList.appendChild(li);
        /*button.type = 'button';
        button.addEventListener('click', ()=>{
            tasks.splice(index, 1);
            renderList();
        })*/
    });
}

function addList() {
    let task = taskInput.value.trim();
    if (task === '') {
        alert('Tugas tidak boleh kosong')
    } else {
        tasks.push({ text: task, completed: false });
        saveTasks();

        renderList();
        
        taskInput.value = '';
    }

}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderList();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderList();
}

renderList();
addButton.addEventListener('click', addList)
taskInput.addEventListener('keypress',(tombol)=>{
    if (tombol.key === 'Enter') {
        addList();
    }
})