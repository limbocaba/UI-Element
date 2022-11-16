const url = 'https://rickandmortyapi.com/api/character'
const charactersContainer = document.querySelector(".char-container")
const modalHeader = document.querySelector("h2")
const modalBody = document.querySelector(".modal-body")
const modalFooter = document.querySelector("h3")
const nextBtn = document.querySelector(".next")
const backBtn = document.querySelector(".back")


let modal = document.getElementById("simpleModal")
let pageCount = 1



let closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open click
// Listen for close click
closeBtn.addEventListener('click', closeModal)
// Listen for outside click
window.addEventListener('click', clickOutside)
// Listen fo next button click event
nextBtn.addEventListener("click", () => fetchCharacters(`${url}?page=${pageCount}`))

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
    <p>Gender: ${character.gender}</p>
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
// Brings you to the next page
function fetchCharacters(currentURL) {
  pageCount++
  fetch(currentURL)
    .then(res => res.json())
    .then(data => {
      displayCharacters(data.results)
      console.log('going forward')
    })
}

fetchCharacters(url)
// Function to display characters and open modals with info
function displayCharacters(characters) {
  charactersContainer.innerText = ""

  characters.forEach((character) => {
    let html = `
      <div class="card">
        <img src="${character.image}" alt="${character.name}" >
        <button class="button modalBtns" data-name="${character.name}">Character Info</button>
      </div>
    `

    charactersContainer.insertAdjacentHTML("beforeend", html)
  })

  let modalBtns = document.querySelectorAll(".modalBtns")

  modalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => openModal(e, characters))
  })
}
// Back button
backBtn.addEventListener('click', () => fetchCharactersBack(`${url}?page=${pageCount}`))

//Brings you to the last page
function fetchCharactersBack(currentURL) {
  pageCount--
  fetch(currentURL)
    .then(res => res.json())
    .then(data => {
      displayCharacters(data.results)
      console.log('going back')
    })
}