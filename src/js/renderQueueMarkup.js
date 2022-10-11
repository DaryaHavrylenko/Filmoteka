import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
import renderMarkupMovieCard from './markapTempllate';
import openModalLibraryQueue from './openModalLibreryQueue';

export default function renderQueueMarkup() {
  const btnQueue = document.querySelector('.btn-header__queue');

  btnQueue.addEventListener('click', onQueue);

  function onQueue(event) {
    event.preventDefault();
    const galleryEl = document.querySelector('.gallery');
    galleryEl.innerHTML = '';

    const parsedFilmsInQueue = getArrQueueWithLocalStorage();

    if (!parsedFilmsInQueue || parsedFilmsInQueue.length === 0) {
      const title = '<h2 class="title-queue">Your queue is empty</h2>';
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = title;

      gallery.classList.add('gallery--queue-empty');
      return;
    }

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
