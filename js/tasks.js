function renderTasksPage() {
  var tasksPage = `
  <section class="nav">
  <div class="container">
      <form id="task-form" class="d-flex">
          <input id="task-data" type="text" class="form-control me-1" placeholder="Введите название задачи">
          <input type="submit" class="btn btn-violet" value="Добавить">
      </form>
  </div>
</section>
<section class="tasks">
  <div class="container">
      <h3 class="display-6">Задачи</h3>
      <hr>
      <ul id="tasks-wrapper" class="list-group list-group-flush">

      </ul>
  </div>
</section>
  `;

  document.body.insertAdjacentHTML('afterbegin',tasksPage);  



  document.querySelector('#task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (document.querySelector('#task-data').value !== '') {
      // Сохранить в LS
      addTask(this);
      document.querySelector('#task-data').value = "";
    } else {
      alert('Введено пусто значение');
    }
  });
  
  
  // document.addEventListener('DOMContentLoaded',function() {
  //1. ПОлучить все задачи из LS
  // var tasks = [
  //   {id:1,name:'Task1',description:'Some desc', image: 'no-image.png'},
  //   {id:2,name:'Task2',description:'Some desc', image: 'no-image.png'},
  //   {id:3,name:'Task3',description:'Some desc', image: 'no-image.png'},
  // ];

  var tasks = JSON.parse(localStorage.getItem('tasks')) || null;

  if (tasks) {
    for (const item of tasks) {
      renderTask(item);
    }
  }
 

// })

document.querySelector('#tasks-wrapper').addEventListener('click', function(event) {
  if (event.target.classList.contains('arrow-btn')) {
    const id = event.target.parentElement.dataset.id;
    // const taskTitle = event.target.parentElement.querySelector('.task-title').textContent;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(function(item) {
      return item.id == id;
    })
    renderTaskViewPage(task);
  }  
});
// document.querySelector('#tasks-wrapper').addEventListener('click', showTask);



}


function renderTask(task) {
// 2. Отрендерить задачи
  const ul = document.querySelector('#tasks-wrapper');

  const li = `
  <li data-id="${task.id}" class="task d-flex justify-content-between list-group-item rounded border-0 shadow p-3 mb-2 bg-body-tertiary">
    <span class="task-title fw-bold">${task.name}</span> 
    <i class="arrow-btn bi bi-chevron-right"></i>
  </li>
`
  ul.insertAdjacentHTML('beforeend',li);
}

function addTask(form) {
  const title = form.children[0].value;
  var task = {name:title, description:'', image: 'no-image.png'};
  // СОхранить в LS
  // var tasks = [];
  // if (localStorage.getItem('tasks')) {
  //   tasks = JSON.parse(localStorage.getItem('tasks'));
  // }
  // tasks.push(task);
  // localStorage.setItem('tasks', JSON.stringify(tasks));

  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (tasks.length > 0)  {
    task.id = tasks[tasks.length-1].id + 1; 
  } else {
    task.id = 1;
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  //ПОлучили из LS массив tasks
  // Отрендерить задачу из LS на экран с пом Ф renderTask (передаем задчку)
 
  renderTask(task);
  
}








// document.querySelector('.image-edit label i').addEventListener('click', function() {
//   const img = document.querySelector(".image-edit input").value;
//   console.log(img);
// })










































