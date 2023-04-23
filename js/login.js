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
                document.querySelector('.login .container').insertAdjacentHTML('afterbegin', `
                <div class="login-error alert alert-danger" role="alert">
                    Пользователь с такими данными не зарегистрирован!
                </div>
                `)
            }

        });
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
                <button type="submit" class="w-100 btn">Зарегистрироваться</button>
              </form>
        </div>
       </div>
    </div>
</section>
    `;
}


function isAuth() {
    if (localStorage.getItem('authUser')) {
        return true;
    } else {
        return false;
    }
}