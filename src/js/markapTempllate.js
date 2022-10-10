// import fetchTrailers from './fetchTrailer';

export default function renderMarkupMovieCard(data) {
  const gallery = document.querySelector('.gallery');

  const genre = JSON.parse(localStorage.getItem('genresDataArray'));

  const markup = data
    .map(
      ({ id, poster_path, genre_ids, vote_average, title, release_date }) => {
        let gen = genre_ids.reduce((acc, item) => {
          genre.forEach(genreItem => {
            if (item === genreItem.id) {
              acc.push([genreItem.name]);
            }
          });
          return acc;
        }, []);

        return `<li class="gallery__item" >
               
                <div class="movie-card" id="${id}">
              
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
                        <p class="info-item"> ${[...gen]}</p>

              <p class="info-item-year">${release_date?.slice(0, 4)}</p>
              </div>
              <div class="second-thumb">
              <p class="info-item-rating"> ${vote_average}</p>
                    </div>
                    </div>
                </div>
    </li> `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

// const gallery = document.querySelector('.gallery');

// gallery.addEventListener('click', onYoutubeClick);

// async function onYoutubeClick(evt) {
//   evt.preventDefault();
//   console.log(evt)
//   if (evt.target.nodeName === 'BUTTON') {
//     // refs.youTubeBackdrop.classList.remove('visually-hidden');
//     // refs.btnAnchorEl.classList.add('btn_anchor-hidden');
//     // refs.bodyEl.classList.add('no-scroll');
//     const filmId = evt.target.closest('.movie-card').id;
//     const response = await fetchTrailers(filmId);
//     if (response.length >= 1) {
//       createIframe(response[0].key);
//       console.log('df', response[0].key )
//     } else if (!response.length) {
//       Notify.warning('There are no trailers for this movie');
//       refs.youTubeBackdrop.classList.add('visually-hidden');
//       refs.bodyEl.classList.remove('no-scroll');
//       console.log('df', response[0].key )
//       return;
//     }
//   }
// }

// function createIframe(results) {
//   const iframe = `<iframe class="iframe" src="https://www.youtube.com/embed/${results}" frameborder="0"></iframe>`;
//   document.body.insertAdjacentHTML('beforeend', iframe);
// }
