// рефакторинг на async await + axios
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderMarkupMovieCard from './markapTempllate';
import findLi from './openModal';
import delay, { visibleSpinner, hideSpinner } from './delay';
import axios from 'axios';

import Pagination from 'tui-pagination';

const container = document.getElementById('pagination');
const gallery = document.querySelector('.gallery');

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);
const paginPage = pagination.getCurrentPage();

const searchForm = document.querySelector('.search__form');

searchForm.addEventListener('submit', onInput);

const url = `https://api.themoviedb.org/3/search/movie?`;

const searchParams = new URLSearchParams({
  api_key: '301d018a3b09052968e9ce18b1793bab',
  language: 'en-US',
  page: 1,
  include_adult: false,
  query: '',
});

async function onInput(event) {
  try {
    // отменяем превент дефолт только при первом поиске при скролле
    //  if (searchParams.get('page') === 1) {
    //    event.preventDefault();
    //  }
    event.preventDefault();
    const movieName = getQuery();
    if (!movieName) {
      Notify.failure('Please enter the movie name');
      return;
    }
    searchParams.set('query', movieName);

    const results = await fetchMovie(paginPage);

    // ???? записываем занчение текущего поиска в local storage для отслеживания разметки при скролле
    // localStorage.setItem('searchQuery', JSON.stringify(results));
    // if (results.page === 1) {
    //   clearGalleryMarkup();
    // }
    clearGalleryMarkup();
    renderMarkupMovieCard(results);
    updateLocalStorage(results);
    findLi();
  } catch (error) {
    console.log(error);
  }
}

function getQuery() {
  return searchForm.elements[0].value.trim();
}

pagination.on('afterMove', updatePagination);

async function updatePagination(event) {
  const currentPage = event.page;
  console.log('currentPage внизу', currentPage);

  const results = await fetchMovie(currentPage); //?????????????????
  clearGalleryMarkup();
  renderMarkupMovieCard(results);
  updateLocalStorage(results);
  findLi();
}

async function fetchMovie(page) {
  visibleSpinner();
  searchParams.set('page', page);

  const { data } = await axios.get(`${url}${searchParams}`);

  // для красивого спинера
  delay(500).then(() => {
    hideSpinner();
  });

  if (data.total_results === 0) {
    Notify.failure('Search result is not successful. Please, try again');
    searchForm.elements[0].value = '';
  }
  const { results, total_results } = data;
  pagination.reset(total_results);

  return results;
}
function clearGalleryMarkup() {
  gallery.innerHTML = '';
}
function updateLocalStorage(results) {
  localStorage.setItem('currentPopularMovies', JSON.stringify(results));
}
// -----------------------------------------------------------------------------------


// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import renderMarkupMovieCard from './markapTempllate';
// import findLi from './openModal';

// import delay, { visibleSpinner, hideSpinner } from './delay';

// const searchForm = document.querySelector('.search__form');
// searchForm.addEventListener('submit', onInput);

// const gallery = document.querySelector('.gallery');

// const url = `https://api.themoviedb.org/3/search/movie?`;

// const searchParams = new URLSearchParams({
//   api_key: '301d018a3b09052968e9ce18b1793bab',
//   language: 'en-US',
//   page: 1,
//   include_adult: false,
//   query: '',
// });

// function onInput(event) {
//   event.preventDefault();

//   const movieName = getQuery();
//   if (!movieName) {
//     Notify.failure('Please enter the movie name');
//     return;
//   }
//   searchParams.set('query', movieName);

//   fetchMovie()
//     .then(data => {
//       console.log(data);
//       if (data.total_results > 200) {
//         Notify.info('Please refine your search, too many matches found');
//       }
//       if (data.total_results === 0) {
//         Notify.failure('Search result is not successful. Please, try again');
//         searchForm.elements[0].value = '';
//       }

//       const { results } = data;

//       clearGalleryMarkup();
//       renderMarkupMovieCard(results);
//       updateLocalStorage(results);
//       findLi();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// function fetchMovie(paginationPage = 1) {
//   visibleSpinner();

//   return fetch(`${url}${searchParams}&page=${paginationPage}`).then(
//     response => {
//       // для красивого спинера
//       delay(500).then(() => {
//         console.log('spinner end');
//         hideSpinner();
//       });

//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function getQuery() {
//   return searchForm.elements[0].value.trim();
// }

// function clearGalleryMarkup() {
//   gallery.innerHTML = '';
// }

// function updateLocalStorage(results) {
//   localStorage.setItem('currentPopularMovies', JSON.stringify(results));
// }
