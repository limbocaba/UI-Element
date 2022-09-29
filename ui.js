// const url = 'https://vpic.nhtsa.dot.gov/api/'
const url = 'https://rickandmortyapi.com/api/character'
const charactersContainer = document.querySelector(".char-container")
const modalHeader = document.querySelector("h2")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector("h3")


let modal = document.getElementById("simpleModal")

// let modalBtn = document.getElementById("modalBtn")

let closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open click
// modalBtn.addEventListener('click', openModal)
// Listen for close click
closeBtn.addEventListener('click', closeModal)
// Listen for outside click
window.addEventListener('click', clickOutside)


// function to open modal
function openModal(e, characters) {
  let character = characters.find((char) => {
    return char.name === e.target.dataset.name
  })
  
  console.log(character)
  // change innerText of modalHeader to info from character
  modalHeader.innerText = character.name
  // change innerHTML of modalBody
  modalBody.innerHTML = `
    <p>Location: ${character.location.name}</p>
    <p>Origin: ${character.origin.name}</p>
    <p>Species: ${character.species}</p>
  `
  // change innerText of modalFooter
  modalFooter.innerText = character.status
  
  modal.style.display = 'block';
}
// function to close modal
function closeModal() {
  modal.style.display = 'none';
}
// function to close if user clicks outside the box
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
}
}

function fetchCharacters(currentURL) {
  fetch(currentURL)
    .then(res => res.json())
    .then(data => {
      displayCharacters(data.results)
    })
}

fetchCharacters(url)

function displayCharacters(characters) {
  characters.forEach((character) => {
    let html = `
      <div class="card">
        <img src="${character.image}" alt="${character.name}" >
        <button class="button modalBtns" data-name="${character.name}">Click Here</button>
      </div>
    `

    charactersContainer.insertAdjacentHTML("beforeend", html)
  })

  let modalBtns = document.querySelectorAll(".modalBtns")

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => openModal(e, characters))
  })
}