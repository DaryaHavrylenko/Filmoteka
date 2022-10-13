// import addAndRemoveQueue from './add&removeQueue';
import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
import renderMarkupMovieCard from './markapTempllate';
import openModalLibraryQueue from './openModalLibreryQueue';
// import renderQueueMarkup from './renderQueueMarkup';

const currentPage = document.querySelector('.navigation__btn--current'); //добавили Лера и Саша
const currentPageText = currentPage.textContent; //добавили Лера и Саша
if (currentPageText === 'my library') {
  const btnQueue = document.querySelector('.btn-header__queue');

  btnQueue.classList.add('btn-header--active');

  function currentBtnQueue() {
    // const btnQueue = document.querySelector('.navigation__btn--current');
    // const btnWatched = document.querySelector('.btn-header__watched');

    const galleryEl = document.querySelector('.gallery');
    galleryEl.innerHTML = '';
    // const galleryEl = document.querySelector('.container');
    // galleryEl.innerHTML = '';

    const parsedFilmsInQueue = getArrQueueWithLocalStorage();

    if (!parsedFilmsInQueue || parsedFilmsInQueue.length === 0) {
      // container.innerHTML = '';
      const title = `<h1 class="title-queue">Your queue is empty</h1>
    <ul class="gallery gallery--library"></ul>`;
      const container = document.querySelector('.container');
      const section = document.querySelector('.gallery-section');
      section.classList.add('library-plug');
      container.innerHTML = title;
      return;
    }

    const titleEl = document.querySelector('.title-queue');
    titleEl?.remove();
    const section = document.querySelector('.gallery-section');
    section?.classList.remove('library-plug');

    renderMarkupMovieCard(parsedFilmsInQueue);
    openModalLibraryQueue();

    //4.2)Видалення картки i оновлення інтерфейсу
    const btnRemoveForQueueEl = document.querySelector('.btn-add-to-queue');
    btnRemoveForQueueEl?.addEventListener('click', onRemoveQueue);

    function onRemoveQueue(event) {
      event.preventDefault();
      deletePhotoMarkup();
      const arrQueueWithLocalStorage = getArrQueueWithLocalStorage();
      renderQueue(arrQueueWithLocalStorage);
    }
  }
  currentBtnQueue();
}
