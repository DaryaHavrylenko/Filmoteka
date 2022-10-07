import { fetchGenres } from "./fetchGenres";
import { fetchPopularMovies } from "./fetchPopularMovies";

const popularMoviesRootEntryPointEl = document.querySelector('.popular-movies-list')



export async function markupCreator() {
    try {
        const feedMeToSingleMarkUpCreator = await fetchPopularMovies();
        const genreList = JSON.parse(localStorage.getItem("genresDataArray"))
        console.log(feedMeToSingleMarkUpCreator)
        console.log(genreList)
        popularMoviesRootEntryPointEl.insertAdjacentHTML('beforeend', feedMeToSingleMarkUpCreator.map(function (singleMovieInfo) {
  return singleMarkupCreator(singleMovieInfo, genreList)
}))
    }
    catch (error) {
        console.log(error)
    }
}

function singleMarkupCreator(singleMovieInfo, genreList) {
    console.log(genreList.data.genres)
    const { poster_path, original_title, release_date, genre_ids } = singleMovieInfo
    // console.log(poster_path, original_title, release_date, genre_ids )
    const image_URL = `https://image.tmdb.org/t/p/w500${poster_path}`
    // console.log(release_date)
    const release_YEAR = release_date.substring(0, 4)
    // console.log(release_YEAR)
    
   
}




//  function createMarkUp(markUpDataArray) {
   
//     console.log(markUpDataArray)
//     if (!markUpDataArray) {return}
//     refs.galleryRootEl.insertAdjacentHTML('beforeend', markUpDataArray.map(singleCardMarkUp))
//      const gallery = new SimpleLightbox('.gallery a', {captionsData:'alt'});
// }

// function singleCardMarkUp(markUpData) {
//     // console.log(markUpData)
//     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = markUpData
    
 
//   const singleCard = `<a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="photo-card">
  
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>`
//     // console.log(singleCard)

//     return singleCard
    
// }

