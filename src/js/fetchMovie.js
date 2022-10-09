import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderMarkupMovieCard from './markapTempllate';
import findLi from './openModal';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
// // import debounce from 'lodash.debounce';
// // const DEBOUNCE_DELAY = 300;

let lubriary = [];

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

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const container = document.querySelector('.tui-pagination');
const paginationSearch = new Pagination(container, options);

console.log(container);

function onInput(event) {
  event.preventDefault();

  const movieName = getQuery();
  if (!movieName) {
    Notify.failure('Please enter the movie name');
    return;
  }
  searchParams.set('query', movieName);
  console.log(searchParams);
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

      console.log('results', results);

      getCurrentResult(results);
      console.log('getCurrentResult', getCurrentResult);

      clearGalleryMarkup();
      renderMarkupMovieCard(results);
      updateLocalStorage(results);
      findLi();
    })
    .catch(error => console.log(error));
}

function getCurrentResult(e) {
  const valueP = e;
  console.log('valueP', valueP);
  return valueP;
}

function searchMovie() {
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

      console.log('results', results);

      getCurrentResult(results);
      console.log('getCurrentResult', getCurrentResult);

      clearGalleryMarkup();
      renderMarkupMovieCard(results);
      updateLocalStorage(results);
    })
    .catch(error => console.log(error));
}

function fetchMovie(paginationPage = 1) {
  searchParams.set('page', paginationPage);

  return fetch(`${url}${searchParams}&&page=${paginationPage}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function getQuery() {
  return searchForm.elements[0].value.trim();
}

function clearGalleryMarkup() {
  gallery.innerHTML = '';
}

function updateLocalStorage(results) {
  localStorage.setItem('currentPopularMovies', JSON.stringify(results));
}

paginationSearch.on('afterMove', handleMoreClick);

container.addEventListener('click', handleMoreClick);

function handleMoreClick(event) {
  const value = event.target.textContent;
  fetchMovie(value)
    .then(data => {
      if (data.total_results > 200) {
        Notify.info('Please refine your search, too many matches found');
      }
      if (data.total_results === 0) {
        Notify.failure('Search result is not successful. Please, try again');
        searchForm.elements[0].value = '';
      }

      const { results } = data;

      console.log('results', results);

      getCurrentResult(results);
      console.log('getCurrentResult', getCurrentResult);

      clearGalleryMarkup();
      renderMarkupMovieCard(results);
      updateLocalStorage(results);
    })
    .catch(error => console.log(error));

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
