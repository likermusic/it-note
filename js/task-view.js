function renderTaskViewPage(task) {
    document.body.innerHTML = '';
    const taskViewPage = `
    <section class="task-view">
        <div class="container">
        </div>
    </section>
    `;
    document.body.insertAdjacentHTML('afterbegin', taskViewPage);
    showTask(task);


    document.querySelector('.task-view').addEventListener('change',function(event) {
        if (event.target.classList.contains('file-image')) {
          const img = document.querySelector(".image-edit input").files[0].name;
          document.querySelector('.task-image').src = `img/${img}`;
        }
      });
}   


function showTask(task) {
      var card = `
            <a id="btn-back" href=""><i class="bi bi-arrow-90deg-left" data-toggle="tooltip" data-bs-title="Перейти к задачам"></i></a>
            <div data-id="${task.id}" class="task-card card mx-auto" style="width: 21rem;">
                  <div class="image-edit input-group mb-3">
                    <img  src="img/${task.image}" class="task-image card-img-top">
                    <label class="" for="inputGroupFile01"><i class="bi bi-pencil"></i></label>
                    <input  type="file" class="d-none form-control file-image" id="inputGroupFile01">
                  </div>
                  <div class="card-body">
                    <input type="text" class="task-title card-title form-control fst-italic" value="${task.name}" placeholder="Введите название задачи">
                    <textarea class="task-desc card-text form-control mb-2" placeholder="Введите описание задачи">${task.description}</textarea>
                    <a id="task-save" href="#" class="d-block py-2 btn btn-violet">Сохранить</a>
                  </div>
              </div>
      `;
  
      document.querySelector('.task-view .container').insertAdjacentHTML('beforeend',card);
      
      document.querySelector('#btn-back').addEventListener('click', function(e) {
        e.preventDefault();
        document.body.innerHTML = '';
        renderTasksPage();
      })

      document.querySelector('#task-save').addEventListener('click', function(){
        const src = document.querySelector('.task-image').src;
        const arr = src.split('/');

        const image = arr[arr.length-1];
        const name = document.querySelector('.task-title').value;
        const description = document.querySelector('.task-desc').value;
        const id = document.querySelector('.task-card').dataset.id;
        // updateTask();

        var tasks = JSON.parse(localStorage.getItem('tasks'))
        const ind = tasks.findIndex(function(item) {
          return item.id == id;
        })

        tasks[ind] = {id,name,description,image};
        localStorage.setItem('tasks', JSON.stringify(tasks));
      })
  }
  





