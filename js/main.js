'use strict';

//========================Получение элементов========================================================
const cartButton = document.querySelector("#cart-button"); //кнопка Корзина
const modalCart = document.querySelector(".modal-cart"); //модальное окно для корзины
const close = document.querySelector(".close"); //крестик модального окна
const buttonAuth = document.querySelector('.button-auth'); //кнопка Войти
const buttonOut = document.querySelector('.button-out'); //кнопка Выйти
const modalAuth = document.querySelector('.modal-auth'); //модальное окно авторизации
const closeAuth = document.querySelector('.close-auth'); //крестик мод. окна авторизации
const buttonLogin = document.querySelector('.button-login'); //кнопка войти в окне авторизации
const logInForm = document.getElementById('logInForm'); //форма в мод. окне авторизации
const loginInput = document.getElementById('login'); //поле ввода логина
const passInput = document.getElementById('password'); //поле ввода пароля
const userName = document.querySelector('.user-name'); //спан куда прописывается имя пользователя
const cardsRestaurants = document.querySelector('.cards-restaurants'); //Секция для выводов карточек с блюдами
const containerPromo = document.querySelector('.container-promo'); //секция с банером
const restaurants = document.querySelector('.restaurants'); //секция где выводятся все товары и заголовок Рестораны
const menu = document.querySelector('.menu'); //секция с выводом товаров определенной группы и заголовок с названием группы
const logo = document.querySelector('.logo'); //лого сайта
const cardsMenu = document.querySelector('.cards-menu'); //Секция для вывовода товаров из группы

//получаем значение логина из локального хранилища браузера
let login = localStorage.getItem('deliveryFood');


//====================================Функции=====================================================

//Функция отображения модального окна с корзиной
const toggleModal = () => {
    modalCart.classList.toggle("is-open");
}

//функция отображения мод. окна авторизации
const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
    loginInput.style.borderColor = '';
    passInput.style.borderColor = '';
    logInForm.reset();
}

//Функция для проверки пользователь является авторизированным или нет
const checkOut = () => {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
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

//Функция создания карточки для товара из группы
const createCardGood = () => {
    const card = document.createElement('div');
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
        <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Пицца Классика</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями, грибы.
                </div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-png"></span>
                </button>
                <strong class="card-price-bold">510 ₽</strong>
            </div>
        </div>
  `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

//Фукнция срабатывания при нажатие по карточке в ресторане
const openGoods = (event) => {
    let target = event.target;

    if (target.closest('.card-restaurant') && login) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        cardsMenu.textContent = '';
        createCardGood();
        createCardGood();
    }else{
      toggleModalAuth();
    }
}

//Функция создания карточки с товаром
const createCardRestaurant = () => {
    cardsRestaurants.insertAdjacentHTML('beforeend', `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `);
}

//==============================================События===========================================
//Событие на отображение и скрытие модального окна с корзиной
cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

//Событие срабатывающие при клике по карточке товара
cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
});

//======================================Вызов функций=============================================
checkOut();

createCardRestaurant();
createCardRestaurant();
createCardRestaurant();