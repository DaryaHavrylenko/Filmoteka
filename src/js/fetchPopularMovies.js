// https://api.themoviedb.org/3/trending/all/day?api_key='301d018a3b09052968e9ce18b1793bab'
import renderMarkupMovieCard from './markapTempllate';
import './openModal';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import findLi from './openModal';

const axios = require('axios').default;

const gallery = document.querySelector('.gallery');

const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';

const options = {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
};

const container = document.querySelector('.tui-pagination');
const paginationSearch = new Pagination(container, options);

export async function fetchPopularMovies(pagePaginationNumber = 1) {
  try {
    const moviesDataArray = await axios.get(
      `${BASE_URL}${API_KEY}&page=${pagePaginationNumber}`
    );

    paginationSearch.reset(moviesDataArray.data.total_pages);
    //  console.log(`${BASE_URL}${API_KEY}&page=${pagePaginationNumber}`)
    if (moviesDataArray.status != 200) {
      return;
    }

    const moviesDataforMarkupCreator = moviesDataArray.data.results;

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

container.addEventListener('click', handleMoreClick);

function handleMoreClick(event) {
  const value = event.target.textContent;

  fetchPopularMovies(value);

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
