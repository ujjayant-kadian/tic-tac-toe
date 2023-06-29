'use strict';
const openPlayerConfig = function (event) {
  editedPlayer = Number(event.target.dataset.playerid);
  playerConfigOverlayElement.style.display = 'block';
  backdropElement.style.display = 'block';
};

const closePlayerConfig = function () {
  playerConfigOverlayElement.style.display = 'none';
  backdropElement.style.display = 'none';
  formElement.firstElementChild.classList.remove('error');
  errorsOutputElement.textContent = '';
  formElement.firstElementChild.children[1].value = '';
};

const savePlayerConfig = function (event) {
  //stop the HTTP request first
  event.preventDefault();
  const formData = new FormData(event.target); //instantiating an object based on a blueprint -> here event.target points at the html that element that called the event
  const enteredPlayername = formData.get('playername').trim(); //using name

  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add('error'); //traversal or drilling
    errorsOutputElement.textContent = `Please enter a valid name!`;
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    `player-${editedPlayer}-data`
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
};
