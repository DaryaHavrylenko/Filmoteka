import axios from 'axios';

const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function fetchTrailers(filmId) {
  axios.defaults.baseURL = BASE_URL;
  try {
    const { data } = await axios.get(
      `movie/${filmId}/videos?api_key=${API_KEY}&language=en-US`
    );
    return data.results;
  } catch (error) {
    console.log(error);
  }
  return data.results;
}
