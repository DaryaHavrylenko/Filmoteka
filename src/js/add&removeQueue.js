import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
export default function addAndRemoveQueue(objMovies) {
  let btnAddToQueueEl = document.querySelector('.film-add__queue');
  btnAddToQueueEl.addEventListener('click', onAddQueue);

  function onAddQueue(event) {
    event.preventDefault();

    const idCurrentFilm = Number(event.currentTarget.id);

    //0)Якщо фільм вже є у списку Черги
    if (btnAddToQueueEl.textContent === 'Remove from Queue') {
      btnAddToQueueEl.textContent = 'Add to Queue';
      btnAddToQueueEl.classList.remove('film-add__queue-active');

      //0.1) Дістаєм з локал сторедж список Черги

      const parsedFilmsInQueue = getArrQueueWithLocalStorage();

      //0.2)Перебираєм масив Черги з локал сторедж
      // і повертаєм фільм який потрібно видалити з списку
      let newArrFilms = parsedFilmsInQueue;
      parsedFilmsInQueue.map((film, index) => {
        if (film.id === idCurrentFilm) {
          // 0.3)Видаляєм з масиву поточний фільм
          newArrFilms.splice(index, 1);
          setArrQueueInLocalStorage(newArrFilms);
        }
        return;
      });

      return;
    }

    //Міняєм стан кнопки
    btnAddToQueueEl.textContent = 'Remove from Queue';
    btnAddToQueueEl.classList.add('film-add__queue-active');

    const moviesFromLocalStorage = getArrQueueWithLocalStorage();

    // 2.1) Добавляєм в локал сторедж Queue якщо там пусто
    if (!moviesFromLocalStorage) {
      try {
        const serializedState = JSON.stringify([objMovies]);
        localStorage.setItem('FilmsArrQueue', serializedState);
      } catch (error) {
        console.error('Set state error: ', error.message);
      }
    }
    //
    // 2.2) Перевіряєм чи поточний фільм є у локал сторедж,
    // якщо так виводимо alert з повідомленням
    if (moviesFromLocalStorage) {
      // якщо там вже є інформація
      let newArrQueue = [];
      let boolPresentFilm = false;

      moviesFromLocalStorage.map(film => {
        if (film.id === idCurrentFilm) {
          boolPresentFilm = true;
        }
        return;
      });
      // 2.3) Перевіряєм чи поточний фільм є у локал сторедж,
      // якщо ні добавляєм в локал сторедж Queue
      if (!boolPresentFilm) {
        try {
          newArrQueue = [objMovies, ...moviesFromLocalStorage];
          const newArrQueueString = JSON.stringify(newArrQueue);
          localStorage.setItem('FilmsArrQueue', newArrQueueString);
        } catch (error) {
          console.error('Set state error: ', error.message);
        }
      }
    }
  }
  //   =================================================================================
  //   ================================Додаткові функції================================
  //   =================================================================================

  // 1) Set масиву фільмів у локал сторедж
  function setArrQueueInLocalStorage(arr) {
    try {
      const serializedState = JSON.stringify(arr);
      localStorage.setItem('FilmsArrQueue', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
}
