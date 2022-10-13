import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage';
export default function deleteMovieWithQueueAtWatched(idMovie) {
  if (idMovie) {
    const arrMovieWithQueue = getArrQueueWithLocalStorage();
    arrMovieWithQueue?.map((film, index) => {
      let newArrMovieInQueue = arrMovieWithQueue;
      if (film.id === idMovie && idMovie) {
        newArrMovieInQueue.splice(index, 1);

        if (newArrMovieInQueue === []) {
          // Добавлено як провірка на null!!!
          setArrQueueInLocalStorage(arrMovieWithQueue);
        } else {
          setArrQueueInLocalStorage(newArrMovieInQueue); //пушимо новий масив у Queue
        }
        // Міняє стан кнопки "Add to Queue"
        let btnAddToQueueEl = document.querySelector('.film-add__queue');
        btnAddToQueueEl.textContent = 'Add to Queue';
        btnAddToQueueEl.classList.remove('film-add__queue-active');
      }
      return;
    });

    function setArrQueueInLocalStorage(arr) {
      try {
        const serializedState = JSON.stringify(arr);
        localStorage.setItem('FilmsArrQueue', serializedState);
      } catch (error) {
        console.error('Set state error: ', error.message);
      }
    }
  }
  return;
}
