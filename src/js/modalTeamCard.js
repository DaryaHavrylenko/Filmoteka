let opModalTeam = document.getElementsByClassName("opModalTeam")[0];
let closeModalTeam = document.getElementsByClassName("modalTeam__button")[0];
let modalTeam = document.getElementsByClassName("modalTeam")[0];

opModalTeam .addEventListener("click", () => {
  modalTeam.classList.toggle("active");
});

closeModalTeam.addEventListener("click", () => {
  modalTeam.classList.remove("active");
});