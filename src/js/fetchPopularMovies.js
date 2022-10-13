// https://api.themoviedb.org/3/trending/all/day?api_key='301d018a3b09052968e9ce18b1793bab'
import renderMarkupMovieCard from './markapTempllate';
import './openModal';
import findLi from './openModal';
import Pagination from 'tui-pagination';

const axios = require('axios').default;

const container = document.getElementById('pagination');
const gallery = document.querySelector('.gallery');

const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);
const pagePaginationNumber = pagination.getCurrentPage();
console.log(pagePaginationNumber);

export async function fetchPopularMovies(pagePaginationNumber = 1) {
  console.log(pagePaginationNumber);
  try {
    const moviesDataArray = await axios.get(
      `${BASE_URL}${API_KEY}&page=${pagePaginationNumber}`
    );

    if (moviesDataArray.status != 200) {
      return;
    }

    const moviesDataforMarkupCreator = moviesDataArray.data.results;
    const totalResults = moviesDataArray.data.total_results;
    pagination.reset(totalResults);

    localStorage.setItem(
      'currentPopularMovies',
      JSON.stringify(moviesDataforMarkupCreator)
    );

    clearGalleryMarkup();
    renderMarkupMovieCard(moviesDataforMarkupCreator);
    findLi();
  } catch (error) {
    console.log(error);
  }
}

function clearGalleryMarkup() {
  gallery.innerHTML = '';
}

pagination.on('afterMove', updatePage);

async function updatePage(event) {
  const currentPage = event.page;
  console.log('currentPage', currentPage);

  await fetchPopularMovies(currentPage);
}