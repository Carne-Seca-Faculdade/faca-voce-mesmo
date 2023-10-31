function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.toggle("hidden");

  function closeOnEscape(event) {
    if (event.key === "Escape") {
      modal.classList.add("hidden");
      window.removeEventListener("keydown", closeOnEscape);
    }
  }

  if (!modal.classList.contains("hidden")) {
    window.addEventListener("keydown", closeOnEscape);
  }
}

const productContactButton = document.querySelector("#productContactButton");
productContactButton.addEventListener("click", () => {
  toggleModal("contactModal");
});

const closeContactModal = document.querySelector("#closeContactModal");
closeContactModal.addEventListener("click", () => {
  toggleModal("contactModal");
});

const editModal = document.querySelector("#edit-product");
editModal.addEventListener("click", () => {
  toggleModal("editModal");
});

const closeEditModal = document.querySelector("#closeEditModal");
closeEditModal.addEventListener("click", () => {
  toggleModal("editModal");
});