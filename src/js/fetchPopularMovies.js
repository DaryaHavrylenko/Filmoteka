// https://api.themoviedb.org/3/trending/all/day?api_key='301d018a3b09052968e9ce18b1793bab'
import renderMarkupMovieCard from './markapTempllate';

const axios = require('axios').default;



const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week?api_key=';


 export async function fetchPopularMovies(pagePaginationNumber = 1) {
    
       try {
          const moviesDataArray = await axios.get(`${BASE_URL}${API_KEY}&page=${pagePaginationNumber}`)
         //  console.log(`${BASE_URL}${API_KEY}&page=${pagePaginationNumber}`)
     if (moviesDataArray.status != 200) {
        return
     }
    
   //  console.log(moviesDataArray)

          const moviesDataforMarkupCreator = moviesDataArray.data.results
          localStorage.setItem("currentPopularMovies", JSON.stringify(moviesDataforMarkupCreator))

     //  return moviesDataforMarkupCreator
          renderMarkupMovieCard(moviesDataforMarkupCreator);
       } catch (error) {
        console.log(error)
       }     
}


