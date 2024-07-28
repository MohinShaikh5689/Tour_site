import '@babel/polyfill';
import { login, logout } from './login.js';
import { signup } from './signup.js';


const logoutBtn = document.querySelector('.nav__el--logout');

document.addEventListener('DOMContentLoaded', () => {
  
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      login(email, password);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      const confirmPassword = document.querySelector('#confirm-password').value;
      signup(name, email, password, confirmPassword);
    });
  }
});
