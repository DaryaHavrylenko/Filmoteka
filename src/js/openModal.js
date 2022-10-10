import addAndRemoveQueue from './add&removeQueue'; // Queue
import checkPresenceMovieInQueue from './checkPresenceMovieInQueue'; // Queue
export default async function findLi() {
  const listOfFilm = document.querySelector('.gallery');
  const condition = await (listOfFilm.children !== []);
  console.log(condition);
  if (condition) {
    const refs = {
      modal: document.querySelector('[data-modal]'),
      // closeModalBtn: document.querySelector('[data-modal-close]'),
      cards: document.querySelectorAll('.movie-card'),
      body: document.querySelector('body'),
      backdrop: document.querySelector('.modal-backdrop'),
    };

    refs.cards.forEach(item => item.addEventListener('click', onOpenModal));
    refs.closeModalBtn.addEventListener('click', onCloseModal);
    refs.modal.addEventListener('click', onClickBackdropModalClose);

    function onOpenModal(event) {
      try {
        let ar = event.currentTarget.id;
        const searchValue = JSON.parse(
          localStorage.getItem('currentPopularMovies')
        ).find(item => item.id == ar);
        renderMarkupModal([searchValue]);
        addAndRemoveQueue(searchValue); //Queue
        checkPresenceMovieInQueue(); //Queue
      } catch (error) {
        console.log(error);
      }

      window.addEventListener('keydown', inKeyDownEscModalClose);

      // refs.modal.classList.toggle('visually-hidden');
      // refs.document.body.style.overflow = 'hidden'; // refs.body.classList.toggle('modal-open');

      // addWatchedBtnListener();
      // addQueuedBtnListener();
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
    function renderMarkupModal(searchValue) {
      const genre = JSON.parse(localStorage.getItem('genresDataArray'));
      const markup = searchValue
        .map(
          ({
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
          }) => {
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
        )
        .join('');

      refs.backdrop.insertAdjacentHTML('beforeend', markup);

      // refs.closeModalBtn.addEventListener('click', () => {
      //   modal.classList.remove('active');
      // });

      const modal = document.querySelector('.film-card__modal');
      modal.classList.toggle('active');

      const closeModalBtn = document.querySelector('[data-modal-close]');
      closeModalBtn.addEventListener('click', onCloseModal);

      function onCloseModal() {
        window.removeEventListener('keydown', inKeyDownEscModalClose);
        // refs.modal.classList.toggle('visually-hidden');
        // refs.document.body.style.overflow = ''; //refs.body.classList.toggle('modal-open');

        modal.classList.remove('active');
        refs.backdrop.innerHTML = '';

        // removeWatchedBtnListener();
        // removeQueuedBtnListener();
      }
      // refs.modal.classList.toggle('visually-hidden');
      // refs.document.body.style.overflow = 'hidden'; // refs.body.classList.toggle('modal-open');
    }
  }
}
