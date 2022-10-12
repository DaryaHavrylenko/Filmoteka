export default function deleteMovieWithWatchedAtQueue(idMovie) {
  console.log('Видаляєм з Watched фільм з id: ', idMovie);
  const arrMovieWithWatched = getArrWatchedInLocalStorage();
  arrMovieWithWatched?.map((film, index) => {
    let newArrMovieInWatched = arrMovieWithWatched;
    if (film.id === idMovie) {
      //   console.log('Цей фільм є у Queue з id: ', idMovie);
      newArrMovieInWatched.splice(index, 1);
      setArrWatchedInLocalStorage(newArrMovieInWatched); //пушимо новий масив у Watched
      //   Міняє стан кнопки "Add to Watched"
      let btnAddToWatchedEl = document.querySelector('.film-add__watched');
      //   btnAddToQueueEl.textContent = 'Addsdgfsdfdfsfsdf to Queue';
      btnAddToWatchedEl.textContent = 'ADD TO WATCHED';
      btnAddToWatchedEl.classList.remove('film-add__watched-active');
    }
    return;
  });

  function setArrWatchedInLocalStorage(arr) {
    try {
      const serializedState = JSON.stringify(arr);
      localStorage.setItem('watched', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
  function getArrWatchedInLocalStorage(arr) {
    try {
      const serializedState = localStorage.getItem('watched');
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}
