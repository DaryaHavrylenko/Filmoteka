import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
export default function addAndRemoveQueue(objMovies) {
  // console.log('У queue', objMovies);
  let btnAddToQueueEl = document.querySelector('.film-add__queue');
  btnAddToQueueEl.addEventListener('click', onAddQueue);
  // btnAddToQueueEl.style.backgroundColor = 'white';
  function onAddQueue(event) {
    event.preventDefault();
    // console.log(event);
    const idCurrentFilm = Number(event.currentTarget.id);

    //0)Якщо фільм вже є у списку Черги
    if (btnAddToQueueEl.textContent === 'Remove from Queue') {
      btnAddToQueueEl.textContent = 'Add to Queue';
      btnAddToQueueEl.style.backgroundColor = 'white';

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
    // console.log(idCurrentFilm);
    //Міняєм стан кнопки
    btnAddToQueueEl.textContent = 'Remove from Queue';
    btnAddToQueueEl.style.backgroundColor = '#FF6B01';

    // 1) Перевіряєм/дістаєм з локал сторедж Queue
    //   movies from local storage
    const moviesFromLocalStorage = getArrQueueWithLocalStorage();
    // // console.log(parsedFilmsInQueue);
    // moviesFromLocalStorage?.map(film => {
    //   //1.1)Перевіряєм чи поточний фільм id співпадає з id фільму з локал сторедж
    //   // console.log(film.id);
    //   if (film.id === idCurrentFilm) {
    //     // console.log(film.id);
    //     // console.log(currentFilm);

    //     currentFilm = film;
    //     // console.log(currentFilm);
    //   }
    //   return;
    // });
    // 2.1) Добавляєм в локал сторедж Queue якщо там пусто
    if (!moviesFromLocalStorage) {
      //якщо там пусто
      console.log('В FilmsArrQueue пусто');

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

          alert('Цей фільм вже є у списку');

          // btnAddToQueueEl.textContent = 'Remove from Queue';
          // btnAddToQueueEl.style.backgroundColor = 'red';
        }
        return;
      });
      // 2.3) Перевіряєм чи поточний фільм є у локал сторедж,
      // якщо ні добавляєм в локал сторедж Queue
      if (!boolPresentFilm) {
        try {
          // newArrQueue = [...moviesFromLocalStorage, objMovies];
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
  // 1) Get масиву фільмів у локал сторедж
  // function getArrQueueWithLocalStorage() {
  //   try {
  //     const serializedState = localStorage.getItem('FilmsArrQueue');
  //     return serializedState === null ? undefined : JSON.parse(serializedState);
  //   } catch (error) {
  //     console.error('Get state error: ', error.message);
  //   }
  // }
  // 2) Set масиву фільмів у локал сторедж
  function setArrQueueInLocalStorage(arr) {
    try {
      const serializedState = JSON.stringify(arr);
      localStorage.setItem('FilmsArrQueue', serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
}
