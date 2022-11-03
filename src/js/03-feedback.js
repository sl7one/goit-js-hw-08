const { values } = require('regenerator-runtime');
const throttle = require('lodash.throttle');

import { save, load } from './serviseJSON.js';

const refs = {
  form: document.querySelector('form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

const userData = {};

console.log(localStorage.length);

if (localStorage.length) {
  const data = load('feedback-form-state');
  // console.log(data.message);
  refs.email.value = data.email;
  refs.message.value = data.message;
}

refs.form.addEventListener('submit', onFormChange);
refs.form.addEventListener('input', throttle(onChangeInput, 500));

function onFormChange(event) {
  event.preventDefault();
  localStorage.clear();
  refs.email.value = '';
  refs.message.value = '';
}

function onChangeInput({ target }) {
  userData[target.name] = target.value;
  save('feedback-form-state', userData);
}
