let opModalTeam = document.querySelector(".opModalTeam");
let closeModalTeam = document.querySelector(".modalTeam__button");
let modalTeam = document.querySelector(".modalTeam");


opModalTeam .addEventListener("click", () => {
  modalTeam.classList.toggle("active");
});

closeModalTeam.addEventListener("click", () => {
  modalTeam.classList.remove("active");
});