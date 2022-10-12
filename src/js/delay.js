export default function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const spinnerEl = document.querySelector('.bcdrop-spiner');

export function visibleSpinner() {
  spinnerEl.classList.add('visible');
}

export function hideSpinner() {
  spinnerEl.classList.remove('visible');
}
