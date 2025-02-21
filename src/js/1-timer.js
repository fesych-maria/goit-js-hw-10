import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import iconPath from '../img/error.svg';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const errorOptions = {
  class: 'error-message',
  title: 'Error',
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
  message: 'Please choose a date in the future',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  backgroundColor: '#ef4040',
  position: 'topRight',
  iconUrl: iconPath,
};
let userSelectedDate;

startBtn.setAttribute('disabled', 'true');
startBtn.addEventListener('click', onClick);
const options = {
  enableTime: true,
  time_24hr: true,
  locale: {
    firstDayOfWeek: 1,
  },
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.setAttribute('disabled', 'true');
    const startTime = Date.now();
    if (selectedDates[0] <= startTime) {
      iziToast.error(errorOptions);
    } else {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

function onClick() {
  startBtn.setAttribute('disabled', 'true');
  input.setAttribute('disabled', 'true');
  const intervalId = setInterval(() => {
    const timerTime = userSelectedDate.getTime() - Date.now();
    if (timerTime <= 0) {
      clearInterval(intervalId);
      input.removeAttribute('disabled');
    } else {
      const obj = convertMs(timerTime);
      days.innerHTML = obj.days;
      hours.innerHTML = obj.hours;
      minutes.innerHTML = obj.minutes;
      seconds.innerHTML = obj.seconds;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const timerData = { days, hours, minutes, seconds };
  const addZeroData = addLeadingZero(timerData);
  return addZeroData;
}

function addLeadingZero(value) {
  value.days = value.days.toString().padStart(2, '0');
  value.hours = value.hours.toString().padStart(2, '0');
  value.minutes = value.minutes.toString().padStart(2, '0');
  value.seconds = value.seconds.toString().padStart(2, '0');
  return value;
}
