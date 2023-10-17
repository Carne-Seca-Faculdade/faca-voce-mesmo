const filterModalButton = document.querySelector("#filterModalButton")
const closeFilterModalButton = document.querySelector("#closeFilterModalButton")
const filterModal = document.querySelector("#filterModal")

filterModalButton.addEventListener("click", () => {
  filterModal.classList.remove("hidden")
})

closeFilterModalButton.addEventListener("click", () => {
  filterModal.classList.add("hidden")
})
