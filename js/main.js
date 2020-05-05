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
const logInForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const passInput = document.getElementById('password');
const userName = document.querySelector('.user-name');

let login = localStorage.getItem('deliveryFood');

const toggleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
  logInForm.reset();
}

const authorized = () => {
  console.log('Авторизован');

  const logOut = () => {
    buttonAuth.style.display = '';
    buttonOut.style.display = '';
    userName.style.display = '';
    login = null;
    localStorage.removeItem('deliveryFood');
    buttonOut.removeEventListener('click', logOut);
    checkOut();
  }

  buttonAuth.style.display = 'none';
  buttonOut.style.display = 'block';
  userName.style.display = 'inline';
  userName.textContent = login;
  buttonOut.addEventListener('click', logOut);
}

const notAuthorized = () => {
  console.log('Не авторизован');
  
  const logIn = (e) => {
    e.preventDefault();
    if( loginInput.value === '' ){
      loginInput.style.borderColor = 'red';
    }
    if(passInput.value === ''){
      passInput.style.borderColor = 'red';
    }
    if( loginInput.value && loginInput.value ){
      loginInput.style.borderColor = '';
      passInput.style.borderColor = '';

      login = loginInput.value;
      localStorage.setItem('deliveryFood', login);
      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      checkOut();
    }
  }
  

  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
}

function checkOut(){
  if(login){
    authorized();
  }else{
    notAuthorized();
  }
}

checkOut();
