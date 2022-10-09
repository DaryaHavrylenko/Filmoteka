import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderMarkupMovieCard from './markapTempllate';

// // import debounce from 'lodash.debounce';
// // const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('.search__form');
searchForm.addEventListener('submit', onInput);

const gallery = document.querySelector('.gallery');

const url = `https://api.themoviedb.org/3/search/movie?`;

const searchParams = new URLSearchParams({
  api_key: '301d018a3b09052968e9ce18b1793bab',
  language: 'en-US',
  page: 1,
  include_adult: false,
  query: '',
});

function onInput(event) {
  event.preventDefault();

  const movieName = getQuery();
  if (!movieName) {
    Notify.failure('Please enter the movie name');
    return;
  }
  searchParams.set('query', movieName);

  fetchMovie()
    .then(data => {
      if (data.total_results > 200) {
        Notify.info('Please refine your search, too many matches found');
      }
      if (data.total_results === 0) {
        Notify.failure('Search result is not successful. Please, try again');
        searchForm.elements[0].value = '';
      }

      const { results } = data;

      clearGalleryMarkup();
      renderMarkupMovieCard(results);
    })
    .catch(error => console.log(error));
}

function fetchMovie() {
  return fetch(`${url}${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function getQuery() {
  return searchForm.elements[0].value.trim();
}

function clearGalleryMarkup() {
  gallery.innerHTML = '';
}
