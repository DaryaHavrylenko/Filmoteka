// 0) При загрузці фільмів перевіряє чи є цей фільм у Queue
// і робить кнопку червоною/зеленою
import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage';
export default function checkPresenceMovieInQueue() {
  const parsedFilmsInQueue = getArrQueueWithLocalStorage();

  const btnAddToQueueEl = document.querySelector('.film-add__queue');

  const idBtn = Number(btnAddToQueueEl.id);
  parsedFilmsInQueue.map(film => {
    if (film.id === idBtn) {
      btnAddToQueueEl.textContent = 'Remove from Queue';
      btnAddToQueueEl.classList.add('film-add__queue-active');
    }
  });
}
