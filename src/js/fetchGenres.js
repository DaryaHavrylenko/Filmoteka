
// https://api.themoviedb.org/3/genre/movie/list?api_key=301d018a3b09052968e9ce18b1793bab&language=en-US 

const axios = require('axios').default;

const API_KEY = '301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=';


 export async function fetchGenres() {
    if (localStorage.getItem("genresDataArray" !== null)) {
        return
    }
       try {
           const genresDataArray = await axios.get(`${BASE_URL}${API_KEY}`)
           if (genresDataArray.status != 200) {
               return
           }
        //    console.log(genresDataArray.data.genres)
        
           localStorage.setItem(
             'genresDataArray',
             JSON.stringify(genresDataArray.data.genres)
           );
        

        
    
    // return genresDataArray.data.genres
       } catch (error) {
        console.log(error)
       }
     
     
}
