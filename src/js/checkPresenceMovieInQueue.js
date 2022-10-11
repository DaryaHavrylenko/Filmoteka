// 0) При загрузці фільмів перевіряє чи є цей фільм у Queue
// і робить кнопку червоною/зеленою
export default function checkPresenceMovieInQueue() {
  const parsedFilmsInQueue = getArrQueueWithLocalStorage();

  const btnAddToQueueEl = document.querySelector('.film-add__queue');

  const idBtn = Number(btnAddToQueueEl.id);
  parsedFilmsInQueue.map(film => {
    if (film.id === idBtn) {
      btnAddToQueueEl.textContent = 'Remove from Queue';
      btnAddToQueueEl.style.backgroundColor = '#FF6B01';
    }
  });
  // 1) Get масиву фільмів з локал сторедж Queue
  function getArrQueueWithLocalStorage() {
    try {
      const serializedState = localStorage.getItem('FilmsArrQueue');
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
}
