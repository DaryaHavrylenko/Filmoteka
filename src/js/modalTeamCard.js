// let opModalTeam = document.querySelector(".opModalTeam");
// let closeModalTeam = document.querySelector(".modalTeam__button");
// let modalTeam = document.querySelector(".modalTeam");


// opModalTeam .addEventListener("click", () => {
//   modalTeam.classList.toggle("active");
// });

// closeModalTeam.addEventListener("click", () => {
//   modalTeam.classList.remove("active");
// });


const refs = {
  openModalBtn: document.querySelector('[data-modal-open-contacts]'),
  closeModalBtn: document.querySelector('[data-modal-close-contacts]'),
  backdrop: document.querySelector('.backdrop__modal'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onClickBackdrop);


//* При клике на ссылку открывается модалка (класс 'is-hidden' убираем c backdrop)
//* По кнопке 'Esc' закрывается


function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onPressESC);
}

//* При клике на кнопку закрывается модалка (добавляем класс 'is-hidden' обратно на backdrop)
//* При закрытии убираем закрытие по 'Esc'

function onCloseModal() {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onPressESC);
}

//* При клике на backdrop закрывается модалка (осуществляется по классу на backdrop)

function onClickBackdrop(e) {
  if (e.target.classList.contains('js-close-modal')) {
    onCloseModal();
  }
}

//* Функция закрытия по 'Esc'
function onPressESC(e) {
  if (e.keyCode === 27) {
    onCloseModal();
  }
}