const filterModalButton = document.querySelector("#filterModalButton");
const closeFilterModalButton = document.querySelector(
  "#closeFilterModalButton",
);
const filterModal = document.querySelector("#filterModal");

function closeModal(modalElement) {
  modalElement.classList.add("hidden");
}

function openModal(modalElement) {
  modalElement.classList.remove("hidden");
}

filterModalButton.addEventListener("click", () => {
  openModal(filterModal);
});

closeFilterModalButton.addEventListener("click", () => {
  closeModal(filterModal);
});

filterModal.addEventListener("click", (event) => {
  const eventTargetId = event.target.id;
  if (eventTargetId !== "filterModal") return;
  closeModal(filterModal);
});

window.addEventListener("keydown", (event) => {
  const filterModalClasses = filterModal.classList;
  if (event.key !== "Escape" || filterModalClasses.contains("hidden")) return;
  closeModal(filterModal);
});
