import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
import renderMarkupMovieCard from './markapTempllate';
import openModalLibraryQueue from './openModalLibreryQueue';

export default function renderQueueMarkup() {
  const btnQueue = document.querySelector('.btn-header__queue');
  const btnWatched = document.querySelector('.btn-header__watched');

  btnQueue.addEventListener('click', onQueue);

  function onQueue(event) {
    event.preventDefault();
    btnWatched.classList.remove('btn-header--active');
    btnQueue.classList.add('btn-header--active');

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
}
renderQueueMarkup();
