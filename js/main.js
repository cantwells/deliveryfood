//Добавляем вывод модального окна с корзиной
const cartButton = document.querySelector("#cart-button"); //кнопка Корзина
const modalCart = document.querySelector(".modal-cart"); //модальное окно для корзины
const close = document.querySelector(".close"); //крестик модального окна

//Функция отображения модального окна с корзиной
const toggleModal = () => {
    modalCart.classList.toggle("is-open");
}

//Событие на отображение и скрытие модального окна с корзиной
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

//day 1
//Получение элементов
const buttonAuth = document.querySelector('.button-auth'); //кнопка Войти
const buttonOut = document.querySelector('.button-out'); //кнопка Выйти
const modalAuth = document.querySelector('.modal-auth'); //модальное окно авторизации
const closeAuth = document.querySelector('.close-auth'); //крестик мод. окна авторизации
const buttonLogin = document.querySelector('.button-login'); //кнопка войти в окне авторизации
const logInForm = document.getElementById('logInForm'); //форма в мод. окне авторизации
const loginInput = document.getElementById('login'); //поле ввода логина
const passInput = document.getElementById('password'); //поле ввода пароля
const userName = document.querySelector('.user-name'); //спан куда прописывается имя пользователя

//получаем значение логина из локального хранилища браузера
let login = localStorage.getItem('deliveryFood');


//функция отображения мод. окна авторизации
const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
    logInForm.reset();
}

//Функция логики авторизированного пользователя
const authorized = () => {
    console.log('Авторизован');

    //Функция срабатывающая на кнопку выйти
    const logOut = () => {
        //выставляем кнопкам значени по умолчанию, а спан затераем
        buttonAuth.style.display = '';
        buttonOut.style.display = '';
        userName.style.display = '';
        login = null; //обнуляем переменую логин. null по тому что когда localStorage пустой он возвращает null
        localStorage.removeItem('deliveryFood'); //удаляем данные из localStorage
        buttonOut.removeEventListener('click', logOut); //Удаляем событие нажатие кнопке Выйти
        checkOut();
    }

    //Прячем кнопку Войти и показываем Выйти и пропиываем имя пользователя в спан
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'block';
    userName.style.display = 'inline';
    userName.textContent = login;
    buttonOut.addEventListener('click', logOut);
}

//Функция логики не авторизированного пользователя
const notAuthorized = () => {
    console.log('Не авторизован');

    //Функция которая срабатывает при отправке формы
    const logIn = (e) => {
        e.preventDefault();
        //Проверка на заполнение полей ввода
        if (loginInput.value === '') {
            loginInput.style.borderColor = 'red';
        }
        if (passInput.value === '') {
            passInput.style.borderColor = 'red';
        }
        if (loginInput.value && loginInput.value) {
            loginInput.style.borderColor = '';
            passInput.style.borderColor = '';

            login = loginInput.value; //получаем значение из поля ввода логина
            localStorage.setItem('deliveryFood', login); //Добавляем его в localStorage
            toggleModalAuth(); //Закрываем окно авторизации
            //Удаляем события чтоб не происходило задваивания их вызова
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset(); //очищаем форму
            checkOut();
        }
    }

    //Событие для отображение и скрытие по крестрику мод. окна авторизации
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

//Функция для проверки пользователь является авторизированным или нет
function checkOut() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkOut();