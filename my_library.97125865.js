var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},l=e.parcelRequired7c6;null==l&&((l=function(e){if(e in t)return t[e].exports;if(e in n){var l=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,l.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},e.parcelRequired7c6=l);var a=l("6N2Ec"),o=l("b2ADC"),r=l("h5ZnV"),c=l("hFFY3"),i=l("6M8XA");a=l("6N2Ec"),o=l("b2ADC");function s(){const e=document.querySelector(".modal-backdrop");function t(t){if("BUTTON"===t.target.nodeName)return;let n=Number(t.currentTarget.id);const l=(0,a.default)().find((e=>e.id===n));!function(t){const n=JSON.parse(localStorage.getItem("genresDataArray")),l=r();function r({id:e,poster_path:l,original_title:a,title:o,overview:r,genre_ids:c,release_date:i,popularity:s,vote_average:d,vote_count:u}=t){let m=c.reduce(((e,t)=>(n.forEach((n=>{t===n.id&&e.push([n.name])})),e)),[]);return`               \n<div class="film-card__modal" data-modal>\n   <button class="film-card__close modal-film__btn" data-modal-close>X</button>\n  <img\n    class="film-card__img"\n    src="https://image.tmdb.org/t/p/w400${l}"\n    width="375px"\n    height="468px"\n    alt="film__img"\n  />\n      <div class="film-card__about">\n      <h3 class="film-card__title">${o}</h3>\n      <table class="about-film">\n        <tbody>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Vote / Votes</td>\n            <td class="about-film__characteristics">\n              <span class="vote-average">${d.toFixed(1)}</span><span class="separator">/</span\n              ><span class="votes-count">${u}</span>\n            </td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Popularity</td>\n            <td class="about-film__characteristics">${s.toFixed(1)}</td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Original Title</td>\n            <td class="about-film__characteristics about-film__title">${a}</td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Genre</td>\n            <td class="about-film__characteristics">${m} </td>\n          </tr>\n        </tbody>\n      </table>\n      <p class="film-card__description">about</p>\n      <p class="film-card__desc">\n       ${r}\n      </p>\n      <ul class="film-add__btn">\n        <li><button class="film-add__watched modal-film__btn" id=${e}>add to Watched</button></li>\n        <li><button class="film-add__queue modal-film__btn" id=${e}>add to Queue</button></li>\n      </ul>\n    </div>\n  </div>\n  \n`}e.insertAdjacentHTML("beforeend",l);const c={closeModalBtn:document.querySelector("[data-modal-close]"),body:document.querySelector("body")};function i(){window.removeEventListener("keydown",u),c.body.style.overflow="",e.classList.remove("active"),c.closeModalBtn.removeEventListener("click",i),e.removeEventListener("click",d),e.innerHTML="";document.querySelector(".gallery").innerHTML="";const t=(0,a.default)();if((0,o.default)(t),s(),!t||0===t.length){const e='<h1 class="title-queue">Your queue is empty</h1>\n    <ul class="gallery gallery--library"></ul>',t=document.querySelector(".container");return document.querySelector(".gallery-section").classList.add("library-plug"),void(t.innerHTML=e)}const n=document.querySelector(".title-queue");null==n||n.remove();const l=document.querySelector(".gallery-section");null==l||l.classList.remove("library-plug")}function d(e){e.target===e.currentTarget&&i()}function u(e){const t="Escape";e.code===t&&i()}e.classList.toggle("active"),c.closeModalBtn.addEventListener("click",i),e.addEventListener("click",d),window.addEventListener("keydown",u),c.body.style.overflow="hidden"}(l),(0,r.default)(l),(0,c.default)(),(0,i.default)()}document.querySelectorAll(".movie-card").forEach((e=>e.addEventListener("click",t)))}!function(){const e=document.querySelector(".btn-header__queue"),t=document.querySelector(".btn-header__watched");e.addEventListener("click",(function(n){n.preventDefault(),t.classList.remove("btn-header--active"),e.classList.add("btn-header--active");document.querySelector(".gallery").innerHTML="";const l=(0,a.default)();if(!l||0===l.length){const e='<h1 class="title-queue">Your queue is empty</h1>\n    <ul class="gallery gallery--library"></ul>',t=document.querySelector(".container");return document.querySelector(".gallery-section").classList.add("library-plug"),void(t.innerHTML=e)}const r=document.querySelector(".title-queue");null==r||r.remove();const c=document.querySelector(".gallery-section");null==c||c.classList.remove("library-plug"),(0,o.default)(l),s();const i=document.querySelector(".btn-add-to-queue");null==i||i.addEventListener("click",(function(e){e.preventDefault(),deletePhotoMarkup();const t=(0,a.default)();renderQueue(t)}))}))}(),l("4S0r6"),l("imNHE"),l("2YGUk");o=l("b2ADC"),r=l("h5ZnV"),c=l("hFFY3"),i=l("6M8XA");l("b2ADC");const d=document.querySelector(".navigation__btn--current").textContent,u=document.querySelector(".btn-header__watched");function m(){const e=document.querySelector(".modal-backdrop");function t(t){if("BUTTON"!==t.target.nodeName)try{let n,l=t.currentTarget.id;"my library"===d&&u.classList.contains("btn-header--active")&&(n=JSON.parse(localStorage.getItem("watched")).find((e=>e.id==l))),function(t){const n=JSON.parse(localStorage.getItem("genresDataArray")),l=a(t);function a({id:e,poster_path:l,original_title:a,title:o,overview:r,genre_ids:c,release_date:i,popularity:s,vote_average:d,vote_count:u}=t){let m=c.reduce(((e,t)=>(n.forEach((n=>{t===n.id&&e.push([n.name])})),e)),[]);return`               \n<div class="film-card__modal" data-modal>\n   <button class="film-card__close modal-film__btn" data-modal-close>X</button>\n  <img\n    class="film-card__img"\n    src="https://image.tmdb.org/t/p/w400${l}"\n    width="375px"\n    height="468px"\n    alt="film__img"\n  />\n      <div class="film-card__about">\n      <h3 class="film-card__title">${o}</h3>\n      <table class="about-film">\n        <tbody>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Vote / Votes</td>\n            <td class="about-film__characteristics">\n              <span class="vote-average">${d.toFixed(1)}</span><span class="separator">/</span\n              ><span class="votes-count">${u}</span>\n            </td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Popularity</td>\n            <td class="about-film__characteristics">${s.toFixed(1)}</td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Original Title</td>\n            <td class="about-film__characteristics about-film__title">${a}</td>\n          </tr>\n          <tr class ="about-film__info">\n            <td class="about-film__description">Genre</td>\n            <td class="about-film__characteristics">${m} </td>\n          </tr>\n        </tbody>\n      </table>\n      <p class="film-card__description">about</p>\n      <p class="film-card__desc">\n       ${r}\n      </p>\n      <ul class="film-add__btn">\n        <li><button class="film-add__watched modal-film__btn" id=${e}>add to Watched</button></li>\n        <li><button class="film-add__queue modal-film__btn" id=${e}>add to Queue</button></li>\n      </ul>\n    </div>\n  </div>\n  \n`}e.insertAdjacentHTML("beforeend",l);const o={closeModalBtn:document.querySelector("[data-modal-close]"),body:document.querySelector("body")};function r(){window.removeEventListener("keydown",i),o.body.style.overflow="",e.classList.remove("active"),o.closeModalBtn.removeEventListener("click",r),e.removeEventListener("click",c),e.innerHTML="";document.querySelector(".gallery").innerHTML="",f()}function c(e){e.target===e.currentTarget&&r()}function i(e){const t="Escape";e.code===t&&r()}e.classList.toggle("active"),o.closeModalBtn.addEventListener("click",r),e.addEventListener("click",c),window.addEventListener("keydown",i),o.body.style.overflow="hidden"}(n),(0,r.default)(n),(0,c.default)(),(0,i.default)()}catch(e){console.log(e)}}document.querySelectorAll(".movie-card").forEach((e=>e.addEventListener("click",t)))}l("6K2nx");const _={btnWatched:document.querySelector(".btn-header__watched"),btnQueue:document.querySelector(".btn-header__queue"),ul:document.querySelector(".gallery")};function f(){const e=localStorage.getItem("watched");if(_.btnQueue.classList.remove("btn-header--active"),_.btnWatched.classList.add("btn-header--active"),"[]"===e||null===e){_.ul.innerHTML=" ";const e='<h1 class="title-queue">Your list is empty</h1>\n    <ul class="gallery gallery--library"></ul>',t=document.querySelector(".container");return document.querySelector(".gallery-section").classList.add("library-plug"),void(t.innerHTML=e)}const t=document.querySelector(".title-queue");null==t||t.remove();const n=document.querySelector(".gallery-section");null==n||n.classList.remove("library-plug"),document.querySelector(".gallery").innerHTML="";const l=JSON.parse(e);l.reverse(),(0,o.default)(l),m()}_.btnWatched.addEventListener("click",f);a=l("6N2Ec"),o=l("b2ADC");if("my library"===document.querySelector(".navigation__btn--current").textContent){document.querySelector(".btn-header__queue").classList.add("btn-header--active"),function(){document.querySelector(".gallery").innerHTML="";const e=(0,a.default)();if(!e||0===e.length){const e='<h1 class="title-queue">Your queue is empty</h1>\n    <ul class="gallery gallery--library"></ul>',t=document.querySelector(".container");return document.querySelector(".gallery-section").classList.add("library-plug"),void(t.innerHTML=e)}const t=document.querySelector(".title-queue");null==t||t.remove();const n=document.querySelector(".gallery-section");null==n||n.classList.remove("library-plug"),(0,o.default)(e),s();const l=document.querySelector(".btn-add-to-queue");null==l||l.addEventListener("click",(function(e){e.preventDefault(),deletePhotoMarkup();const t=(0,a.default)();renderQueue(t)}))}()}
//# sourceMappingURL=my_library.97125865.js.map
