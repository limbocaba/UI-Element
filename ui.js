let modal = document.getElementById("simpleModal")

let modalBtn = document.getElementById("modalBtn")

let closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open click
modalBtn.addEventListener('click', openModal)
// Listen for close click
closeBtn.addEventListener('click', closeModal)
// Listen for outside click
window.addEventListener('click', clickOutside)


// function to open modal
function openModal() {
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