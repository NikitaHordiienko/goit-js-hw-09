function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startChangeColorBtnEl = document.querySelector('button[data-start]');
const stopChangeColorBtnEl = document.querySelector('button[data-stop]');
const backgroundColorEl = document.querySelector('body');
let timerId = null;
stopChangeColorBtnEl.disabled = true;

startChangeColorBtnEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        let randomColor = getRandomHexColor();
        backgroundColorEl.style.backgroundColor = randomColor;
    }, 1000);
    startChangeColorBtnEl.disabled = true;
    stopChangeColorBtnEl.disabled = false;
});

stopChangeColorBtnEl.addEventListener('click', () => {
    clearInterval(timerId)    
    startChangeColorBtnEl.disabled = false;
    stopChangeColorBtnEl.disabled = true;
})

