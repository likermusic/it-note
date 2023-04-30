// const users = [
//     { id: 1, email: 'user1@mail.ru', password: '123' },
//     { id: 2, email: 'user2@mail.ru', password: '321' },
// ];
// localStorage.setItem('users', JSON.stringify(users));


function renderLoginPage() {
    document.body.innerHTML = '';
    if (isAuth()) {
        //Редирект на страницу просмотра задач
        renderTasksPage();
    } else {
        const loginPage = loginPageMarkup();
        document.body.insertAdjacentHTML('afterbegin', loginPage);

        document.querySelector('.modal .form-register').addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.target;
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            const name = document.querySelector('.form-register #modal-name').value;
            const email = document.querySelector('.form-register #modal-email').value;
            const password = document.querySelector('.form-register #modal-password').value;
            if (registerUser(name, email, password)) {
                alert('Вы успешно зарегистрированы!');
                document.body.innerHTML = '';
                renderTasksPage();
            }
        })

        document.querySelector('.form-login')?.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.querySelector('#email').value;
            var password = document.querySelector('#password').value;

            if (localStorage.getItem('users')) {
                const users = JSON.parse(localStorage.getItem('users'));
                // [{"id":1,"email":"d@m.ry","password":"123321Ru"}]
                // console.log(users);

                //Проверить если не пуст LS
                var user = users.find(function (item) {
                    // if (email == item.email && password == item.password) {
                    //     return item;
                    // }
                    return email == item.email && password == item.password;
                });

                if (!user) {
                    document.querySelector('.login-error')?.remove();
                    document.querySelector('.login .container').insertAdjacentHTML('afterbegin', `
                    <div class="login-error alert alert-danger" role="alert">
                        Неверный логин или пароль!
                    </div>
                    `)
                } else {
                    localStorage.setItem('authUser', user.id);
                    document.body.innerHTML = '';
                    renderTasksPage();
                }
            } else {
                document.querySelector('.login-error')?.remove();
                document.querySelector('.login .container').innerHTML = `
                <div class="login-error alert alert-danger" role="alert">
                    Пользователь с такими данными не зарегистрирован!
                </div>
                `;
            }

        });
    }

}

function registerUser(name, email, password) {
    // var users = []
    // if (localStorage.getItem('users')) {
    //     users = JSON.parse(localStorage.getItem('users'));
    // }

    var users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
        const isUserInLS = users.find(function (user) {
            return user.email == email;
        })

        if (isUserInLS) {
            document.querySelector('.form-register .alert-warning')?.remove();
            document.querySelector('.modal .modal-body').insertAdjacentHTML('beforebegin', `
        <div class="alert alert-warning" role="alert">
         Пользователь с таким e-mail уже существует!
        </div>
        `)
            return false;
        } else {
            const id = users[users.length - 1].id + 1;
            const user = { id, email, password, name };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('authUser', id);
            return true;


            // ПРОБЛЕМА - закрывается модальное окно при регистрации
            //Уведомление об успешной регистрации
        }


    }

}


function loginPageMarkup() {
    return `
    <section class="login">
    <div class="container">
        <div class="row text-center">
            <div class="col-12 logo">
                <i class="bi bi-chat-dots"></i>
            </div>
            <div class="col-12 app-name">it-note</div>
        </div>

       <div class="row">
        <div class="col-12 col-sm-6 mx-auto">
            <form class="form-login mt-4">
                <div class="mb-3">
                    <i class="bi bi-person-circle"></i>  
                    <input type="email" class="form-control" id="email" name="email" placeholder="Введите почту">
                </div>
                <div class="mb-3">
                    <i class="bi bi-lock-fill"></i>
                    <input type="password" class="form-control" id="password" name="password" placeholder="Введите пароль">
                </div>
                <button type="submit" class="w-100 btn mb-3">Войти</button>
                <!-- <button onclick="return false;" class="w-100 btn" data-bs-toggle="modal" data-bs-target="#registerModal">Зарегистрироваться</button> -->
                <button onclick="return false;" class="w-100 btn" data-bs-toggle="modal" data-bs-target="#registerModal">Зарегистрироваться</button>
              </form>
        </div>
       </div>
    </div>
</section>


<!-- Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5">Регистрация пользователя</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form class="form-register mt-4 needs-validation" novalidate>
            <div class="modal-body">
                <div class="mb-3">
                    <i class="bi bi-person-circle"></i>  
                    <input type="text" class="form-control" id="modal-name" name="name" placeholder="Введите имя" required> 
                </div>
                <div class="mb-3">
                    <i class="bi bi-envelope-at"></i>
                    <input type="email" class="form-control" id="modal-email" name="email" placeholder="Введите почту" required>
                </div>
                <div class="mb-3">
                    <i class="bi bi-lock-fill"></i>
                    <input type="password" class="form-control" id="modal-password" name="password" placeholder="Введите пароль" required>
                </div>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                <button id="register" class="w-100 btn mb-3">Зарегистрироваться</button>
            </div>
            </form>
        </div>
    </div>
</div>
    `;
}


function isAuth() {
    if (localStorage.getItem('authUser')) {
        return true;
    } else {
        return false;
    }
}




