import fetchTrailers from './fetchTrailer';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default function renderMarkupMovieCard(data) {
  const gallery = document.querySelector('.gallery');

  const genre = JSON.parse(localStorage.getItem('genresDataArray'));

  const markup = data
    .map(
      ({ id, poster_path, genre_ids, title, release_date, vote_average }) => {
        let gen = genre_ids.reduce((acc, item) => {
          genre.forEach(genreItem => {
            if (item === genreItem.id) {
              acc.push(' ' + [genreItem.name]);
              // console.log(genreItem.name);
            }
          });
          return acc;
        }, []);

        const genres = [...gen];
        if (genres.length > 2) genres.splice(2);
        if (genres.length === 2) genres.push(`  Other`);
        // console.log(genres);
        if (release_date === 0 || release_date === undefined) release_date = '';
        return `<li class="gallery__item" >
               
                <div class="movie-card" id="${id}">
              <button class="movie-card_poster-btn">
              <svg style="pointer-events: none" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 158 110" enable-background="new 0 0 158 110" xml:space="preserve">
<path id="XMLID_142_" fill="#FF0000" d="M154.4,17.5c-1.8-6.7-7.1-12-13.9-13.8C128.2,0.5,79,0.5,79,0.5s-48.3-0.2-60.6,3
	c-6.8,1.8-13.3,7.3-15.1,14C0,29.7,0.3,55,0.3,55S0,80.3,3.3,92.5c1.8,6.7,8.4,12.2,15.1,14c12.3,3.3,60.6,3,60.6,3s48.3,0.2,60.6-3
	c6.8-1.8,13.1-7.3,14.9-14c3.3-12.1,3.3-37.5,3.3-37.5S157.7,29.7,154.4,17.5z"/>
<polygon id="XMLID_824_" fill="#FFFFFF" points="63.9,79.2 103.2,55 63.9,30.8 "/>
</svg>
              </button>
                <div class="movie-card__poster-container"> ${
                  poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w300${poster_path}"`
                    : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
                }
                        class="movie-card__poster"
                        alt="${title}"
                        loading="lazy"
                    /></div>
                    <h2 class="movie-info-title"> ${title}</h2>
                    <div class="movie-card__thumb">
                    <div class="movie-info-list">
                        <p class="info-item"> ${genres} </p>  
<span class "info-item-slash">  &#127902; </span>  
              <p class="info-item-year">${release_date?.slice(0, 4)}</p>
              </div>
    </li>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', onYoutubeClick);

const body = document.querySelector('body'); 
let closeModalBtn;
let backdrop;
async function onYoutubeClick(evt) {
  evt.preventDefault();
  // console.log(evt);
  if (evt.target.nodeName === 'BUTTON') {
    // refs.youTubeBackdrop.classList.remove('visually-hidden');
    // refs.btnAnchorEl.classList.add('btn_anchor-hidden');
    // refs.bodyEl.classList.add('no-scroll');
    const filmId = evt.target.closest('.movie-card').id;
    const response = await fetchTrailers(filmId);
    if (response.length >= 1) {
      createIframe(response[0].key);
      // console.log('df', response[0].key);
    } else if (!response.length) {
      Notify.warning('There are no trailers for this movie');
      refs.youTubeBackdrop.classList.add('visually-hidden');
      refs.bodyEl.classList.remove('no-scroll');
      // console.log('df', response[0].key);
      return;
    }
    window.addEventListener('keydown', onKeyDownEscModalClose);
    // const body = document.querySelector('body');
    body.style.overflow = 'hidden';
    
    backdrop.addEventListener('click', onClickBackdrModalClose);
  }
}

// console.log(closeModalBtn, backdrop, body)

function createIframe(results) {
  const iframe = `<div class="backdrop-trailer"><div class="modal-trailer"><button class="close-modal__trailer">X</button>
  <iframe class="iframe" fullscreen src="https://www.youtube.com/embed/${results}" frameborder="0"></iframe>
  </div></div>`;
  document.body.insertAdjacentHTML('beforeend', iframe);
 closeModalBtn = document.querySelector('.close-modal__trailer');
backdrop = document.querySelector('.backdrop-trailer');
  closeModalBtn.addEventListener('click', closeModalYouTube);
}

function closeModalYouTube() {

  document.querySelector('.backdrop-trailer').remove();
  window.removeEventListener('keydown', onKeyDownEscModalClose);
  body.style.overflow = '';
  closeModalBtn.removeEventListener('click', closeModalYouTube);
  backdrop.removeEventListener('click', onClickBackdrModalClose);
  //  backdrop.innerHTML = '';
}

function onClickBackdrModalClose(event) {
  if (event.target === event.currentTarget) {
    closeModalYouTube();
  }
}

function onKeyDownEscModalClose(event) {
  const KEY_CODE_ESCAPE = 'Escape';

  if (event.code === KEY_CODE_ESCAPE) {
    closeModalYouTube();
  }
}
