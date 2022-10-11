import renderMarkupMovieCard from './markapTempllate';
import findLi from './modalWatched';
import openModal from './openModal';

const refs = {
  btnWatched: document.querySelector('.btn-header'),
  ul: document.querySelector('.gallery'),
};

refs.btnWatched.addEventListener('click', getWatched);

export default function getWatched() {
  const fromLS = localStorage.getItem('watched');

  if (fromLS === '[]' || fromLS === null) {
    clear();
    return refs.ul.insertAdjacentHTML(
      'afterbegin',
      '<li><h1 style=color:green> your list is empty </h1></li>'
    );
  }
  clear();
  const arrayFilms = JSON.parse(fromLS);
  renderMarkupMovieCard(arrayFilms);
  findLi();
}

function clear() {
  refs.ul.innerHTML = ' ';
}

function modalWatched() {}
