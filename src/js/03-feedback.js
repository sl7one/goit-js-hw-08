const { values } = require('regenerator-runtime');
const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const userData = {
  email: '',
  textarea: '',
};

refs.form.addEventListener('submit', onFormChange);
refs.email.addEventListener('input', throttle(onChange, 500));
refs.textarea.addEventListener('input', throttle(onChange, 500));

function onFormChange(event) {
  event.preventDefault();
  clearLines();
}

function onChange({ target }) {
  setUserData(target);
}

function clearLines() {
  refs.email.value = '';
  refs.textarea.value = '';
  localStorage.clear();
}

function setUserData(target) {
  switch (target.nodeName) {
    case 'INPUT':
      userData.email = target.value;
      break;
    case 'TEXTAREA':
      userData.textarea = target.value;
      break;
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function getDataFromLocaleStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  refs.email.value = data.email;
  refs.textarea.value = data.textarea;
}

if (localStorage.length !== 0) {
  getDataFromLocaleStorage();
}
