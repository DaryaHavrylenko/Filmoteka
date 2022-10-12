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
    // return refs.ul.insertAdjacentHTML(
    //   'afterbegin',
      const title = '<h1 class="title-queue"> your list is empty </h1>';
      const container = document.querySelector('.container');
        const section = document.querySelector('.gallery-section');
        section.classList.add('library-plug');
        container.innerHTML = title;
        return;
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
