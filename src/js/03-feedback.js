const throttle = require('lodash.throttle');

const formEl = document.querySelector('form');
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onInputFormHandler, 1000));
formEl.addEventListener('submit', onSubmitFormHandler);

function getCurrentStorageData(key) {
  const storageValue = localStorage.getItem(key);
  if (storageValue === null) {
    return {};
  } else {
    try {
      return JSON.parse(storageValue);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}

function setCurrentFormState(
  { email = '', message = '' } = { email: '', message: '' }
) {
  formEl.email.value = email;
  formEl.message.value = message;
}

function onInputFormHandler(e) {
  initialDataObj[e.target.name] = e.target.value;
  let formValue = JSON.stringify(initialDataObj);
  // console.log('onInputFormHandler', formValue);
  localStorage.setItem(STORAGE_KEY, formValue);
}

function onSubmitFormHandler(e) {
  e.preventDefault();

  console.log('onSubmitFormHandler', getCurrentStorageData(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  initialDataObj.email = undefined;
  initialDataObj.message = undefined;
}

// const ss = localStorage.getItem(STORAGE_KEY);
// console.log('localStorage', ss);

const initialDataObj = getCurrentStorageData(STORAGE_KEY);
setCurrentFormState(initialDataObj);
