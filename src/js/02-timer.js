import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDateChoiceEl = document.querySelector('#datetime-picker');
const timerEl = document.querySelector('.timer');
const startButtonEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const daysLabelEl = document.querySelector('.label-days');
const hoursEl = document.querySelector('span[data-hours]');
const hoursLabelEl = document.querySelector('.label-hours');
const minutesEl = document.querySelector('span[data-minutes]');
const minutesLabelEl = document.querySelector('.label-minutes');
const secondsEl = document.querySelector('span[data-seconds]');
const secondsLabelEl = document.querySelector('.label-seconds');
startButtonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure('Please choose a date in the future');
          startButtonEl.disabled = true;
      } else {
          startButtonEl.disabled = false;
    }
  },
};

flatpickr(inputDateChoiceEl, options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, 0)
};

startButtonEl.addEventListener('click', () => {
    const internalTimer = setInterval(() => {
        const diff = new Date(inputDateChoiceEl.value) - new Date();
        startButtonEl.disabled = true;
        if (diff >= 0) {
            const remainingTimeCount = convertMs(diff);

            daysEl.textContent = addLeadingZero(remainingTimeCount.days);
            daysLabelEl.textContent = declensionNum(remainingTimeCount.days,
                ['день', 'дні', 'днів',]
            );

            hoursEl.textContent = addLeadingZero(remainingTimeCount.hours);
            hoursLabelEl.textContent = declensionNum(remainingTimeCount.hours,
                ['година', 'години', 'годин']
            );

            minutesEl.textContent = addLeadingZero(remainingTimeCount.minutes);
            minutesLabelEl.textContent = declensionNum(remainingTimeCount.minutes,
                ['хвилина', 'хвилини', 'хвилин']
            );

            secondsEl.textContent = addLeadingZero(remainingTimeCount.seconds);
            secondsLabelEl.textContent = declensionNum(remainingTimeCount.seconds,
                ['секунда', 'секунди', 'секунд']
            );

            timerEl.style.color = 'black';
        } else {
            clearInterval(internalTimer);
            timerEl.style.color = 'green';
        }
    }, 1000);
});

function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
};