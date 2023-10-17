const filterModalButton = document.querySelector("#filterModalButton")
const closeFilterModalButton = document.querySelector("#closeFilterModalButton")
const filterModal = document.querySelector("#filterModal")

filterModalButton.addEventListener("click", () => {
  filterModal.classList.remove("hidden")
})

closeFilterModalButton.addEventListener("click", () => {
  filterModal.classList.add("hidden")
})

filterModal.addEventListener("click", (event) => {
  
  const eventTargetId = event.target.id
  if (eventTargetId !== "filterModal") return

  filterModal.classList.add("hidden")
})

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return

  filterModal.classList.add("hidden")
})