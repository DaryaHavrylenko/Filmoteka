import renderMarkupMovieCard from './markapTempllate';
import findLi from './openModal';
import openModal from './openModal';


const refs = {
    btnWatched:document.querySelector('.btn-header'),
    ul:document.querySelector('.gallery'),
}

refs.btnWatched.addEventListener('click', getWatched);

function getWatched() {
const fromLS = localStorage.getItem("watched");



if(fromLS === "[]" || fromLS === null ){
  clear();
  return refs.ul.insertAdjacentHTML("afterbegin", "<li><h1 style=color:green> you did not see nothing, you can could chouse new intresting film on main page</h1></li>");
}
clear();
const film = JSON.parse(fromLS)
renderMarkupMovieCard(film)
// findLi();
// openModal();
console.log("after");
}

function clear() {
    refs.ul.innerHTML = " "
}


function modalWatched() {
  
}