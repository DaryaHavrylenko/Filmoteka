import { Notify } from 'notiflix/build/notiflix-notify-aio';
import deleteMovieWithQueueAtWatched from './deleteMovieWithQueueAtWatched'; //видалення фільму з Queue

export default function onOpenMovieCard() {
  const addToWatchedBtn = document.querySelector('.film-add__watched');
  checkIsInTheWatchedList(addToWatchedBtn.id);

  addToWatchedBtn.addEventListener('click', addToWatched);

  function checkIsInTheWatchedList(id) {
    if (
      localStorage.getItem('watched') === null ||
      localStorage.getItem('watched') === []
    ) {
      return;
    } else {
      const localWatchedItems = JSON.parse(localStorage.getItem('watched'));

      const isInWatchedList = localWatchedItems?.some(
        item => item.id === Number(id)
      );

      if (isInWatchedList) {
        addToWatchedBtn.classList.add('film-add__watched-active');
        addToWatchedBtn.textContent = 'DELETE FROM WATCHED';
      }
    }
  }

  function addToWatched() {
    addToWatchedBtn.classList.toggle('film-add__watched-active');
    const localWatchedItems = JSON.parse(
      localStorage.getItem('currentPopularMovies')
    );
    const currentMovie = localWatchedItems.find(
      item => item.id === Number(addToWatchedBtn.id)
    );

    if (
      addToWatchedBtn.classList.contains('film-add__watched-active') ||
      localStorage.getItem('watched') === null
    ) {
      addToWatchedBtn.textContent = 'DELETE FROM WATCHED';
      // menuItem.textContent = 'Delete from watched';
      const movieId = Number(addToWatchedBtn.id);
      deleteMovieWithQueueAtWatched(movieId); //Видаляє з Queue

      addOneMovieToLocalStorage(currentMovie);
      //Видаляє з Queue
    } else {
      addToWatchedBtn.textContent = 'ADD TO WATCHED';
      // menuItem.textContent = 'Add to watched';
      deleteOneMovieToLocalStorage(currentMovie);
    }
  }

  function addOneMovieToLocalStorage(movie) {
    if (localStorage.getItem('watched') === null) {
      const watchedArray = [];
      watchedArray.push(movie);
      localStorage.setItem('watched', JSON.stringify(watchedArray));
      // Notify.success('This movie was added to the WATCHED list');
    } else {
      const localStorageWatched = JSON.parse(localStorage.getItem('watched'));
      localStorageWatched.push(movie);
      localStorage.setItem('watched', JSON.stringify(localStorageWatched));
      // Notify.success('This movie was added to the WATCHED list');
    }
  }

  function deleteOneMovieToLocalStorage(movie) {
    const localStorageWatched = JSON.parse(localStorage.getItem('watched'));
    if (localStorageWatched.length === 1) {
      const emptyWatchedList = [];
      localStorage.setItem('watched', JSON.stringify(emptyWatchedList));
      // Notify.failure('This movie was deleted from WATCHED list');
    } else {
      const updateWatchedList = localStorageWatched.filter(
        item => item.id !== Number(movie.id)
      );

      localStorage.setItem('watched', JSON.stringify(updateWatchedList));
      // Notify.failure('This movie was deleted from WATCHED list');
    }
  }
}
