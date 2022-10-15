// import fetchPopularMovies from './fetchPopularMovies';
// import renderMarkupMovieCard from './markapTempllate';

const API_KEY = 'api_key=301d018a3b09052968e9ce18b1793bab';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];

const main = document.getElementById('main');
const form = document.querySelector('.search__form');
const search = document.querySelector('.search__field');

const tagsEl = document.getElementById('tags');
let selectedGenre = []
// setGenre();
genresBtn.addEventListener('click', setGenre);


//*pagination parameters
// const prev = document.getElementById('prev')
// const next = document.getElementById('next')
// const current = document.getElementById('current')

// let  currentPage = 1;
// let  nextPage = 2;
// let  prevPage = 3;
// let  lastUrl = '';
// let  totalPages = 100;



function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    //Для каждого жанра делаем div с классом 'tag'
    //Записываем туда имя жанра
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    tagsEl.append(t);
    // console.log(tagsEl);

    //по клику проверяем
    t.addEventListener('click', () => {
      //если выбранная картинка не имеет жанра,
      main.classList.add('sorted-main-container');
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        //если выбранная картинка содержит жанр,
        // и что бы она не повторялась в списке

        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          //мы его туда добавляем
          selectedGenre.push(genre.id);
        }
      }
      // console.log(selectedGenre);
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

//функция которая сбрасывает все жанры одной кнопкой 

function clearBtn(){
  //что-бы наша кнопка clear не дублировалась
  let clearBtn = document.getElementById('clear');
  if(clearBtn){
      clearBtn.classList.add('highlight')
  }else{
          //формируем кнопку Clear
      let clear = document.createElement('div');
      clear.classList.add('tag','highlight', 'clear-btn');
      clear.id = 'clear';
      clear.innerText = 'Clear All';
      clear.addEventListener('click', () => {
          selectedGenre = [];
          setGenre();            
          getMovies(API_URL);
      })
      tagsEl.append(clear);
  }
  
}



// renderMarkupMovieCard(API_URL);
// getMovies(API_URL);

function getMovies(url) {
  //получаем фильмы по URL из библиотеки
  // lastUrl = url;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      // console.log(data.results)
      if(data.results.length !== 0){
      showMovies(data.results);
          // currentPage = data.page;
          // nextPage = currentPage + 1;
          // prevPage = currentPage - 1;
          // totalPages = data.total_pages;

          // current.innerText = currentPage;

          // if(currentPage <= 1){
          //   prev.classList.add('disabled');
          //   next.classList.remove('disabled')
          // }else if(currentPage>= totalPages){
          //   prev.classList.remove('disabled');
          //   next.classList.add('disabled')
          // }else{
          //   prev.classList.remove('disabled');
          //   next.classList.remove('disabled')
          // }

          tagsEl.scrollIntoView({behavior : 'smooth'})

      }else{
          main.innerHTML= `<div class="container library-container noMovies"><h1 class="title-queue">There are no movies, try other genres</h1></div>`
      }
    });
}


function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    //создаем раскладку с картинками
    const {
      title,
      poster_path,
      vote_average,
      release_date,
      overview,
      id,
      genre_ids,
    } = movie;
    // { id, poster_path, genre_ids, title, release_date, vote_average }
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    //template for each picture
    movieEl.innerHTML = `
      
    
    <li>
               
      <div class="movie-card" id="${id}">
      <div class="movie-card__poster-container"> ${
        poster_path
          ? `<img src="https://image.tmdb.org/t/p/w300${poster_path}"`
          : `<img src="https://yt3.ggpht.com/AAKF_677TIvjFz_9xFF0R6PgiVd0kRpEtY6APSxSDRP65nXg8hkn9NFsz2bRd9_Z37DJ9D_b=s900-c-k-c0x00ffffff-no-rj"`
      }
              class="movie-card__poster"
              alt="${title}"
              loading="lazy"
          /></div>

          <div class="movie-info">
          
             <h2 class="movie-info-title"> ${title}</h2>
              <span class=" movie-info-rating ${getColor(
                vote_average
              )}">${vote_average}</span>
          </div>

  

   
    </div>
</li>
      
      `;

    main.appendChild(movieEl);

    document.getElementById(id).addEventListener('click', () => {
      console.log(id);
      openNav(movie);
    });
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

//функция, которая задает цвета для наших фильтров

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
      tag.classList.remove('highlight')
  })
  clearBtn()
  //проверяем есть ли в жанрах что-то
  if(selectedGenre.length !=0){   
      selectedGenre.forEach(id => {
          const hightlightedTag = document.getElementById(id);
          hightlightedTag.classList.add('highlight');
      })
  }

}




const genresBtn = document.querySelector('.dropdown-genres-btn');
// const genresList = document.querySelector('.dropdown-content');
genresBtn.addEventListener('click', myFunction);



function myFunction() {
  document.getElementById('tags').classList.toggle('show');
}
document.onclick = function (event) {
  if (!event.target.matches('.dropdown-toggle')) {
    const dropdowns = document.getElementsByClassName('dropdown-menu');
    let i = 0;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};





//*pagination

// prev.addEventListener('click', () => {
//   if(prevPage > 0){
//     pageCall(prevPage);
//   }
// })

// next.addEventListener('click', () => {
//   if(nextPage <= totalPages){
//     pageCall(nextPage);
//   }
// })

// function pageCall(page){
//   let urlSplit = lastUrl.split('?');
//   let queryParams = urlSplit[1].split('&');
//   let key = queryParams[queryParams.length -1].split('=');


// if(key[0] != 'page'){
//     let url = lastUrl + '&page='+page
//     fetchPopularMovies(url);
//   }else{
//     key[1] = page.toString();
//     let a = key.join('=');
//     queryParams[queryParams.length -1] = a;
//     let b = queryParams.join('&');
//     let url = urlSplit[0] +'?'+ b
//     fetchPopularMovies(url);
//   }
// }