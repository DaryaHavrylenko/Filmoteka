import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage';
export default function deleteMovieWithQueueAtWatched(idMovie) {
  // const btnRemoveWatched = document.querySelector('.film-add__watched-active');
  // console.log(btnWatched);
  if (idMovie) {
    console.log('Видаляєм з Queue фільм з id: ', idMovie);
    const arrMovieWithQueue = getArrQueueWithLocalStorage();
    arrMovieWithQueue?.map((film, index) => {
      let newArrMovieInQueue = arrMovieWithQueue;
      if (film.id === idMovie && idMovie) {
        //   console.log('Цей фільм є у Queue з id: ', idMovie);

        newArrMovieInQueue.splice(index, 1);

        setArrQueueInLocalStorage(newArrMovieInQueue); //пушимо новий масив у Queue
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
