const cartButton = document.querySelector("#cart-button");
const modalCart = document.querySelector(".modal-cart");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modalCart.classList.toggle("is-open");
}

//day 1
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const buttonLogin = document.querySelector('.button-login');

let login = '';

const toggleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
}

buttonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);