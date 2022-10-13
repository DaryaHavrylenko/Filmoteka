import addAndRemoveQueue from './add&removeQueue'; // Queue
import checkPresenceMovieInQueue from './checkPresenceMovieInQueue'; // Queue
import onOpenMovieCard from './addToWatchedBtn'; // добавила Лера для Watched btn
import getArrQueueWithLocalStorage from './getArrQueueWithLocalStorage'; // Queue
import renderMarkupMovieCard from './markapTempllate';

export default function openModalLibraryQueue() {
  const backdrop = document.querySelector('.modal-backdrop');
  const cards = document.querySelectorAll('.movie-card');
  cards.forEach(item => item.addEventListener('click', onOpenModal));

  function onOpenModal(event) {
    if (event.target.nodeName === 'BUTTON') return;

    let ar = Number(event.currentTarget.id);

    const arrWithLocalStorageQueue = getArrQueueWithLocalStorage();

    const currentMovie = arrWithLocalStorageQueue.find(item => item.id === ar);

    renderMarkupModal(currentMovie); //Queue
    addAndRemoveQueue(currentMovie); //Queue
    checkPresenceMovieInQueue(); //Queue
    onOpenMovieCard();
  }

  function renderMarkupModal(searchValue) {
    const genre = JSON.parse(localStorage.getItem('genresDataArray'));

    const markup = mark();

    function mark({
      id,
      poster_path,
      original_title,
      title,
      overview,
      genre_ids,
      release_date,
      popularity,
      vote_average,
      vote_count,
    } = searchValue) {
      let gen = genre_ids.reduce((acc, item) => {
        genre.forEach(genreItem => {
          if (item === genreItem.id) {
            acc.push([genreItem.name]);
          }
        });
        return acc;
      }, []);
      return `               
<div class="film-card__modal" data-modal>
   <button class="film-card__close modal-film__btn" data-modal-close>X</button>
  <img
    class="film-card__img"
    src="https://image.tmdb.org/t/p/w400${poster_path}"
    width="375px"
    height="468px"
    alt="film__img"
  />
      <div class="film-card__about">
      <h3 class="film-card__title">${title}</h3>
      <table class="about-film">
        <tbody>
          <tr class ="about-film__info">
            <td class="about-film__description">Vote / Votes</td>
            <td class="about-film__characteristics">
              <span class="vote-average">${vote_average.toFixed(
                1
              )}</span><span class="separator">/</span
              ><span class="votes-count">${vote_count}</span>
            </td>
          </tr>
          <tr class ="about-film__info">
            <td class="about-film__description">Popularity</td>
            <td class="about-film__characteristics">${popularity.toFixed(
              1
            )}</td>
          </tr>
          <tr class ="about-film__info">
            <td class="about-film__description">Original Title</td>
            <td class="about-film__characteristics about-film__title">${original_title}</td>
          </tr>
          <tr class ="about-film__info">
            <td class="about-film__description">Genre</td>
            <td class="about-film__characteristics">${gen} </td>
          </tr>
        </tbody>
      </table>
      <p class="film-card__description">about</p>
      <p class="film-card__desc">
       ${overview}
      </p>
      <ul class="film-add__btn">
        <li><button class="film-add__watched modal-film__btn" id=${id}>add to Watched</button></li>
        <li><button class="film-add__queue modal-film__btn" id=${id}>add to Queue</button></li>
      </ul>
    </div>
  </div>
  
`;
    }

    backdrop.insertAdjacentHTML('beforeend', markup);

    const refs = {
      closeModalBtn: document.querySelector('[data-modal-close]'),
      body: document.querySelector('body'),
    };

    backdrop.classList.toggle('active');
    refs.closeModalBtn.addEventListener('click', onCloseModal);
    backdrop.addEventListener('click', onClickBackdropModalClose);
    window.addEventListener('keydown', inKeyDownEscModalClose);
    refs.body.style.overflow = 'hidden';

    function onCloseModal() {
      window.removeEventListener('keydown', inKeyDownEscModalClose);
      refs.body.style.overflow = '';
      backdrop.classList.remove('active');
      refs.closeModalBtn.removeEventListener('click', onCloseModal);
      backdrop.removeEventListener('click', onClickBackdropModalClose);
      backdrop.innerHTML = '';

      // 1)При видаленні карточки і закритті модалки рендериться розмітка карток заново
      const galleryEl = document.querySelector('.gallery');

      galleryEl.innerHTML = '';
      const arrMovieWithLocalStorage = getArrQueueWithLocalStorage();

      renderMarkupMovieCard(arrMovieWithLocalStorage);
      openModalLibraryQueue();
      //2)якщо черга пуста виводить Your queue is empty
      if (!arrMovieWithLocalStorage || arrMovieWithLocalStorage.length === 0) {
        const title = `<h1 class="title-queue">Your queue is empty</h1>
    <ul class="gallery gallery--library"></ul>`;
        const container = document.querySelector('.container');
        const section = document.querySelector('.gallery-section');
        section.classList.add('library-plug');
        container.innerHTML = title;
        return;
      }
      const titleEl = document.querySelector('.title-queue');
      titleEl?.remove();
      const section = document.querySelector('.gallery-section');
      section?.classList.remove('library-plug');
    }

    function onClickBackdropModalClose(event) {
      if (event.target === event.currentTarget) {
        onCloseModal();
      }
    }

    function inKeyDownEscModalClose(event) {
      const KEY_CODE_ESCAPE = 'Escape';

      if (event.code === KEY_CODE_ESCAPE) {
        onCloseModal();
      }
    }
  }
}
