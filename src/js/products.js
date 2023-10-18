const filterModalButton = document.querySelector("#filterModalButton");
const closeFilterModalButton = document.querySelector(
  "#closeFilterModalButton"
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
    "#categoryDropdownFilter"
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
    const rangeInput = event.target;
    const filterInputSlider = document.querySelector(`#${rangeInput.id}Slider`);
    filterInputSlider.innerHTML = rangeInput.value;
    filterInputSlider.classList.add("show");
  });
  rangeInput.addEventListener("blur", (event) => {
    const rangeInputId = event.target.id;
    const filterInputSlider = document.querySelector(`#${rangeInputId}Slider`);
    filterInputSlider.classList.remove("show");
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

function toggleOrderDropdown() {
  var dropdown = document.getElementById("ordenacao-dropdown");
  dropdown.classList.toggle("show");
}

function ordenarProdutos(opcao) {
  var productsContainer = document.querySelector(".products");
  var products = Array.from(
    productsContainer.getElementsByClassName("grid-product")
  );

  products.sort(function (a, b) {
    var precoA = parseFloat(
      a
        .querySelector(".grid-product__info strong")
        .innerText.replace(/[^\d,-]/g, "")
        .replace(",", ".")
    );
    var precoB = parseFloat(
      b
        .querySelector(".grid-product__info strong")
        .innerText.replace(/[^\d,-]/g, "")
        .replace(",", ".")
    );

    if (opcao === "maior-preco") {
      return precoB - precoA;
    } else if (opcao === "menor-preco") {
      return precoA - precoB;
    }

    return 0;
  });

  products.forEach(function (product) {
    productsContainer.removeChild(product);
  });

  products.forEach(function (product) {
    productsContainer.appendChild(product);
  });

  document.getElementById("ordenacao-dropdown").classList.remove("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".order-button")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
