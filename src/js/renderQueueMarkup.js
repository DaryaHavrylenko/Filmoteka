import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
import renderMarkupMovieCard from './markapTempllate';
import openModalLibraryQueue from './openModalLibreryQueue';
import checkPresenceMovieInQueue from './checkPresenceMovieInQueue'; // Queue
// import findLi from './openModal';
export default function renderQueueMarkup() {
  const btnQueue = document.querySelector('.btn-header__queue');
  // console.log(btnQueue);
  btnQueue.addEventListener('click', onQueue);

  function onQueue(event) {
    event.preventDefault();
    const galleryEl = document.querySelector('.gallery');
    galleryEl.innerHTML = '';

    //   // deletePhotoMarkup();//1111111111111111111111111111111111111111111111111111111111111
    // console.log('asdasdasddasas');
    //   //дістаємо з локал сторедж
    //   // const savedFilmsInQueue = localStorage.getItem('FilmsArrQueue');
    //   // openModalLibraryQueue();
    //   // const parsedFilmsInQueue = JSON.parse(savedFilmsInQueue);
    const parsedFilmsInQueue = getArrQueueWithLocalStorage();
    //   console.log(parsedFilmsInQueue);

    if (!parsedFilmsInQueue || parsedFilmsInQueue.length === 0) {
      console.log('title');
      const title =
        '<h2 class="title-queue" style="color: black" >Your queue is empty</h2>';
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = title;

      gallery.classList.add('gallery--queue-empty');
      return;
    }
    //   // рендер
    // renderQueue(parsedFilmsInQueue);
    renderMarkupMovieCard(parsedFilmsInQueue);
    openModalLibraryQueue();

    // checkPresenceMovieInQueue();
    //   // findLi(); //openModal

    // 4.1) При загрузці фільмів перевіряє чи є цей фільм у Queue
    // і робить кнопку червоною/зеленою
    // checkPresenceFilm();

    //   //1111111111111111111111111111111111111111111111111111111111111
    //   //Видаляєм фільм з локал сторедж
    //   addToQueueRemove();

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
