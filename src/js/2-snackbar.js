import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import errorPath from '../img/error.svg';
import successPath from '../img/success.svg';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('.form-input'),
  radioState: document.querySelectorAll('input[name="state"]'),
};

refs.form.addEventListener('submit', onSubmit);

let currentState;

const onError = {
  class: 'error-message',
  title: 'Error',
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
  message: '',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: errorPath,
};

const onSuccess = {
  class: 'error-message',
  title: 'OK',
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
  message: '',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  backgroundColor: '#59a10d',
  position: 'topRight',
  iconUrl: successPath,
};

refs.radioState.forEach(el => {
  el.addEventListener('change', e => {
    currentState = e.target.value;
  });
});

function onSubmit(e) {
  e.preventDefault();
  createPromise()
    .then(delay => {
      onSuccess.message = `✅ Fulfilled promise in ${delay}ms`;
      iziToast.success({ ...onSuccess });
    })
    .catch(delay => {
      onError.message = `❌ Rejected promise in ${delay}ms`;
      iziToast.error({ ...onError });
    });
  e.currentTarget.reset();
}

function createPromise() {
  const delay = Number(refs.delayInput.value);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentState === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
