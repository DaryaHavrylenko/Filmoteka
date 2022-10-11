import axios from 'axios';
import delay, { visibleSpinner, hideSpinner } from './delay';

const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function fetchTrailers(filmId) {
  axios.defaults.baseURL = BASE_URL;
  visibleSpinner();
  try {
    await delay(500);
    const { data } = await axios.get(
      `movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`
    );
    hideSpinner();
    return data.results;
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
}
