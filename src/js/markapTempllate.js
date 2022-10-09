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

        return `<li class="gallery__item" data-id="${id}">
                <div class="movie-card">
                 ${
                   poster_path
                     ? `<img src="https://image.tmdb.org/t/p/w300${poster_path}"`
                     : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
                 }
                        class="movie-card__poster"
                        alt="${title}"
                        loading="lazy"
                    />
                    <h2 class="movie-info-title"> ${title}</h2>
                    <div class="movie-card__thumb">
                    <div class="movie-info-list">
                        <p class="info-item"> ${[...gen]}</p>
<span>&#2404;</span>
              <p class="info-item-year">${release_date?.slice(0, 4)}</p>
              </div>
              <div class="second-thumb">
              <p class="info-item-rating"> ${vote_average.toFixed(1)}</p>
                    </div>
                    </div>
                </div>
    </li> `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
