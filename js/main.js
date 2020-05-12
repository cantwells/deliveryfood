'use strict';

//========================Получение элементов========================================================
const cartButton = document.querySelector("#cart-button"); //кнопка Корзина
const modalCart = document.querySelector(".modal-cart"); //модальное окно для корзины
const close = document.querySelector(".close"); //крестик модального окна
const buttonAuth = document.querySelector('.button-auth'); //кнопка Войти
const buttonOut = document.querySelector('.button-out'); //кнопка Выйти
const buttonCart = document.querySelector('.button-cart'); //кнопка Корзина
const modalAuth = document.querySelector('.modal-auth'); //модальное окно авторизации
const closeAuth = document.querySelector('.close-auth'); //крестик мод. окна авторизации
const buttonLogin = document.querySelector('.button-login'); //кнопка войти в окне авторизации
const logInForm = document.getElementById('logInForm'); //форма в мод. окне авторизации
const loginInput = document.getElementById('login'); //поле ввода логина
const passInput = document.getElementById('password'); //поле ввода пароля
const formDest = document.getElementById('form-dest'); //скрытое поле с данными по назанчени
const userName = document.querySelector('.user-name'); //спан куда прописывается имя пользователя
const cardsRestaurants = document.querySelector('.cards-restaurants'); //Секция для выводов карточек с блюдами
const containerPromo = document.querySelector('.container-promo'); //секция с банером
const restaurants = document.querySelector('.restaurants'); //секция где выводятся все товары и заголовок Рестораны
const menu = document.querySelector('.menu'); //секция с выводом товаров определенной группы и заголовок с названием группы
const logo = document.querySelector('.logo'); //лого сайта
const cardsMenu = document.querySelector('.cards-menu'); //Секция для вывовода товаров из группы
const restaurantTitle = document.querySelector('.restaurant-title'); //заголовок ресторана
const restaurantRating = document.querySelector('.restaurant-rating'); //рейтинг ресторана
const restaurantPrice = document.querySelector('.restaurant-price'); //цены в ресторане
const restaurantCategory = document.querySelector('.restaurant-category'); //тип ресторана
const buttonAddCart = document.querySelector('.button-add-cart'); //добавление в корзину
const listItems = document.querySelector('.list-items'); //контейнер с выводом товаров
const modalPricetag = document.querySelector('.modal-pricetag'); //вывод суммы покупки
const buttonClearCart = document.querySelector('.clear-cart'); //кнопка отмены в корзине
const modalBody = document.querySelector('.modal-body'); //модальное окно корзины

//получаем значение логина из локального хранилища браузера
let login = localStorage.getItem('deliveryFood');

//Корзина
const cart = JSON.parse(localStorage.getItem(`сart${login}`)) || [];

//============Swipper Slider============
const mySlider = new Swiper('.swiper-container', {
    init: false,
    autoplay: true,
    loop: true,
    speed: 1300,
    // effect: 'flip',
    // slidesPerView: 2,
});
// mySlider.update();
//====================================Функции=====================================================

//Функция получения данных из db
const getData = async function(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Не возможно получить данные по адресу ${url}. Код ошибки ${response.status}!`);
    } else {
        return await response.json();
    }
}

//Функция отображения модального окна с корзиной
const toggleModal = () => modalCart.classList.toggle("is-open");

//функция отображения мод. окна авторизации
const toggleModalAuth = () => {
    modalAuth.classList.toggle('is-open');
    loginInput.style.borderColor = '';
    passInput.style.borderColor = '';
    logInForm.reset();
}

//Функция проверки валидации для поля логина
const validlogin = (string) => {
    const reg = /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/;
    return reg.test(string);
}

//Функция для проверки пользователь является авторизированным или нет
const checkOut = () => login ? authorized() : notAuthorized();

//Функция возврата на главную странцу
const returnMain = () => {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    console.dir(mySlider);
}

//Функция логики авторизированного пользователя
const authorized = () => {
    //Функция срабатывающая на кнопку выйти
    const logOut = () => {
        //выставляем кнопкам значени по умолчанию, а спан затераем
        buttonAuth.style.display = '';
        buttonOut.style.display = '';
        buttonCart.style.display = '';
        userName.style.display = '';
        login = null; //обнуляем переменую логин. null по тому что когда localStorage пустой он возвращает null
        localStorage.removeItem('deliveryFood'); //удаляем данные из localStorage
        buttonOut.removeEventListener('click', logOut); //Удаляем событие нажатие кнопке Выйти
        returnMain();
        checkOut();
    }

    //Прячем кнопку Войти и показываем Выйти и пропиываем имя пользователя в спан
    buttonAuth.style.display = 'none';
    buttonOut.style.display = 'flex';
    buttonCart.style.display = 'flex';
    userName.style.display = 'inline';
    userName.textContent = login;
    buttonOut.addEventListener('click', logOut);
}

//Функция логики не авторизированного пользователя
const notAuthorized = () => {
    //Функция которая срабатывает при отправке формы
    const logIn = (e) => {
        e.preventDefault();
        //Проверка на заполнение полей ввода
        if (loginInput.value === '' || !validlogin(loginInput.value)) {
            loginInput.style.borderColor = 'red';
        }
        if (passInput.value === '') {
            passInput.style.borderColor = 'red';
        }
        if (loginInput.value && validlogin(loginInput.value)) {
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

            if (formDest.card) {
                renderGoods(formDest.card);
                delete formDest['card'];
            }
        }
    }

    //Событие для отображение и скрытие по крестрику мод. окна авторизации
    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

//Функция создания карточки для товара из группы
const createCardGood = ({ id, description, image, name, price }) => {

    const card = document.createElement('div');
    card.id = id;
    card.className = 'card';
    card.insertAdjacentHTML('beforeend', `
        <img src="${image}" alt="image" class="card-image" />
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">${name}</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">${description}</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary button-add-cart">
                <span class="button-card-text">В корзину</span>
                <span class="button-cart-png"></span>
                </button>
                <strong class="card-price card-price-bold">${price} ₽</strong>
            </div>
        </div>
  `);
    cardsMenu.insertAdjacentElement('beforeend', card);
}

const renderGoods = card => {
    if (login) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        menu.classList.remove('hide');
        cardsMenu.textContent = '';
        restaurantTitle.textContent = card.querySelector('.card-title').textContent;
        restaurantPrice.textContent = card.querySelector('.price').textContent;
        restaurantRating.textContent = card.querySelector('.rating').textContent;
        restaurantCategory.textContent = card.querySelector('.category').textContent;
        getData(`../db/${card.dataset.product}`).then((data) => {
            data.forEach((data) => {
                createCardGood(data);
            });
        });
    } else {
        formDest.card = card;
        toggleModalAuth();
    }
}

//Фукнция срабатывания при нажатие по карточке в ресторане
const openGoods = (event) => {
    let target = event.target.closest('.card-restaurant');
    renderGoods(target);
}

//Функция создания карточки с товаром
const createCardRestaurant = (object) => {
    const { image, kitchen, name, price, products, stars, time_of_delivery: timeOfDelivery } = object;
    cardsRestaurants.insertAdjacentHTML('beforeend', `
        <a class="card card-restaurant" data-product="${products}">
        <img src="${image}" alt="image" class="card-image"/>
        <div class="card-text">
            <div class="card-heading">
            <h3 class="card-title">${name}</h3>
            <span class="card-tag tag">${timeOfDelivery} мин</span>
            </div>
            <div class="card-info">
            <div class="rating">${stars}</div>
            <div class="price">От ${price} ₽</div>
            <div class="category">${kitchen}</div>
            </div>
        </div>
        </a>
    `);
}

//Добавление в карзину
const addToCart = (event) => {
    const target = event.target;
    const button = target.closest('.button-add-cart');
    if (button) {
        const card = target.closest('.card');

        const id = card.id;
        const title = card.querySelector('.card-title-reg').textContent;
        const price = card.querySelector('.card-price').textContent;
        cart.push({ id, title, price, count: 1 });
        localStorage.setItem(`сart${login}`, JSON.stringify(cart));
        button.style.display = 'none';
    }
}

const createCartItem = ({ id, title, price, count }) => {
    const food = `
        <div class="food-row">
            <span class="food-name">${title}</span>
            <strong class="food-price">${parseInt(price) * count} ₽</strong>
            <div class="food-counter">
                <button class="counter-button counter-minus" data-id="${id}">-</button>
                <span class="counter">${count}</span>
                <button class="counter-button counter-plus" data-id="${id}">+</button>
            </div>
        </div>
    `;
    listItems.insertAdjacentHTML('afterbegin', food);
}

//Отрисовка товара в корзине
const renderCart = () => {
    listItems.textContent = '';
    cart.forEach(item => createCartItem(item));
    let totalPrice = cart.reduce((result, item) => {
        return result += parseInt(item.price) * item.count;
    }, 0);
    modalPricetag.textContent = `${totalPrice} ₽`;
}

//очистка корзины
const clearCart = () => {
    listItems.textContent = '';
    cart.forEach(item => {
        const card = document.getElementById(item.id);
        const btn = card.querySelector('.button-add-cart');
        btn.style.display = '';
    });
    cart.length = 0;
    modalPricetag.textContent = '0 ₽';
    localStorage.removeItem(`сart${login}`);
}

const changeCount = (event) => {
    const target = event.target;

    if (target.classList.contains('counter-plus')) {

        const elem = cart.find(item => target.dataset.id == item.id);
        elem.count++;
        localStorage.setItem(`сart${login}`, JSON.stringify(cart));
        renderCart();
    }
    if (target.classList.contains('counter-minus')) {
        const elem = cart.find(item => target.dataset.id == item.id);
        if (elem.count > 1) {
            elem.count--;
            localStorage.setItem(`сart${login}`, JSON.stringify(cart));
            renderCart();
        } else {
            cart.splice(cart.indexOf(elem), 1);

            localStorage.setItem(`сart${login}`, JSON.stringify(cart));
            if (!cart.length) localStorage.removeItem(`сart${login}`);
            renderCart();
            const card = document.getElementById(target.dataset.id);
            const btn = card.querySelector('.button-add-cart');
            btn.style.display = '';
        }
    }
}

//Функция инициализации
const init = () => {
    getData('../db/partners.json').then((data) => {
        data.forEach((data) => {

            createCardRestaurant(data);
        });
    });

    //==============================================События===========================================

    //Событие на отображение и скрытие модального окна с корзиной
    cartButton.addEventListener("click", toggleModal);
    cartButton.addEventListener("click", renderCart);
    close.addEventListener("click", toggleModal);
    //Событие срабатывающие при клике по карточке товара
    cardsRestaurants.addEventListener('click', openGoods);
    //обработка нажатия по карточкам товаров
    cardsMenu.addEventListener('click', addToCart);
    //очистка корзины
    buttonClearCart.addEventListener('click', clearCart);
    //увеличивать/уменьшать кол-во товара
    modalBody.addEventListener('click', changeCount);
    //возвращение на главную страницу
    logo.addEventListener('click', returnMain);
    mySlider.init();
    checkOut();
}


//======================================Вызов функций=============================================

init();