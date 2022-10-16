const refs = {
  openSubscribe: document.querySelector('.button-subscribe__pulse'),
  closeSubscribe: document.querySelector('[data-subscribe-close]'),
  wrapper: document.querySelector('.subscribe__wrapper'),
};

refs.openSubscribe.addEventListener('click', onOpenSubscribe);
refs.closeSubscribe.addEventListener('click', onCloseSubscribe);
refs.wrapper.addEventListener('click', onClickBackdrop);

function onOpenSubscribe() {
  refs.wrapper.classList.remove('is-hidden-subscribe');
  window.addEventListener('keydown', onPressESC);
}

function onCloseSubscribe() {
  refs.wrapper.classList.add('is-hidden-subscribe');
  window.removeEventListener('keydown', onPressESC);
}

// //* При клике на backdrop закрывается модалка (осуществляется по классу на backdrop)

function onClickBackdrop(e) {
  if (e.target.classList.contains('js-close-subscribe')) {
    onCloseSubscribe();
  }
}

//* Функция закрытия по 'Esc'
function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseSubscribe();
  }
}

const scriptURL =
  'https://script.google.com/macros/s/AKfycbyQOYXGaePRep6FToNSfKqZU2Eut6p_H22MuQstAS5A3IsoWG8UCWkAN-MZEQt7NI-wCw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => {
      msg.innerHTML = 'Thank you for subscribing!';
      setTimeout(() => {
        msg.innerHTML = '';
      }, 5000);
      form.reset();
    })
    .catch(error => console.error('Error!', error.message));
});
