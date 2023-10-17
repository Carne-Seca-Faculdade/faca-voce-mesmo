const productContactButton = document.querySelector("#productContactButton");
const closeContactModal = document.querySelector("#closeContactModal");
const contactModal = document.querySelector("#contactModal");

productContactButton.addEventListener("click", () => {
  contactModal.classList.remove("hidden");
});

closeContactModal.addEventListener("click", () => {
  contactModal.classList.add("hidden");
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  contactModal.classList.add("hidden");
});
