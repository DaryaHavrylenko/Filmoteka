import renderMarkupMovieCard from './markapTempllate';
import findLi from './modalWatched';
import openModal from './openModal';

const refs = {
  btnWatched: document.querySelector('.btn-header__watched'),
  btnQueue: document.querySelector('.btn-header__queue'),
  ul: document.querySelector('.gallery'),
};

refs.btnWatched.addEventListener('click', getWatched);

export default function getWatched() {
  const fromLS = localStorage.getItem('watched');
  refs.btnQueue.classList.remove('btn-header--active');
  refs.btnWatched.classList.add('btn-header--active');

  if (fromLS === '[]' || fromLS === null) {
    clear();
    // return refs.ul.insertAdjacentHTML(
    //   'afterbegin',
    const title = `<h1 class="title-queue">Your queue is empty</h1>
    <ul class="gallery gallery--library"></ul>`;
    const container = document.querySelector('.container');
    const section = document.querySelector('.gallery-section');
    section.classList.add('library-plug');
    container.innerHTML = title;
    return;
  }
  const titleEl = document.querySelector('.title-queue');
  titleEl?.remove();
  const section = document.querySelector('.gallery-section');
  section?.classList.remove('library-plug');
  clear();
  const arrayFilms = JSON.parse(fromLS);
  arrayFilms.reverse();
  renderMarkupMovieCard(arrayFilms);
  findLi();
}

function clear() {
  refs.ul.innerHTML = ' ';
}
