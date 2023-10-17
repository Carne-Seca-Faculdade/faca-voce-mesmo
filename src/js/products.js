const filterModalButton = document.querySelector("#filterModalButton");
const closeFilterModalButton = document.querySelector(
  "#closeFilterModalButton",
);
const filterModal = document.querySelector("#filterModal");
const filterModalForm = document.querySelector("#filterModalForm");
const filterModalRangeInputs = document.querySelectorAll(".form-range-input");

function closeModal(modalElement) {
  modalElement.classList.add("hidden");
}

function openModal(modalElement) {
  modalElement.classList.remove("hidden");
}

function handleFilterModalFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObject = Object.fromEntries(formData);
  console.log("FILTERING PRODUCTS WITH ", formDataObject);
  closeModal(filterModal);
}

function loadFilterCategories() {
  console.log("LOAD CATEGORIES CALLED");
  const categoryDropdownFilter = document.querySelectorAll(
    "#categoryDropdownFilter",
  );
  const categorySelect = categoryDropdownFilter[1];
  const categoriesList = [
    {
      label: "Todas",
      value: "all",
    },
    {
      label: "Jardinagem",
      value: "gardening",
    },
    {
      label: "Limpeza",
      value: "cleaning",
    },
    {
      label: "Construção",
      value: "construction",
    },
  ];
  const categoriesListHTML = categoriesList
    .map((category) => {
      return `<option value="${category.value}">${category.label}</option>`;
    })
    .join("");

  categorySelect.innerHTML = categoriesListHTML;
}

filterModalForm.addEventListener("submit", handleFilterModalFormSubmit);

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

filterModalRangeInputs.forEach((rangeInput) => {
  rangeInput.addEventListener("input", (event) => {
    const rangeInputValue = event.target.value;
    const rangeInputId = event.target.id;
    console.log(rangeInputValue);
    console.log(rangeInputId);
  });
});

window.addEventListener("keydown", (event) => {
  const filterModalClasses = filterModal.classList;
  if (event.key !== "Escape" || filterModalClasses.contains("hidden")) return;
  closeModal(filterModal);
});

window.addEventListener("DOMContentLoaded", () => {
  loadFilterCategories();
});
