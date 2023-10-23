import "./src/components";
import { handleLogin } from "./src/utils/handleLoginModal";
import { v4 as uuid } from "uuid";
import { Router } from "./src/services/Router";
import { ProductType } from "./src/@types/ProductType";
import { formatPriceToCents } from "./src/utils/helpers";
import { createModal } from "./src/utils/createModal";
import { Store } from "./src/services/Store";
import { auth } from "./src/services/config/firebase";
import { ProductController } from "./src/controllers/ProductController";
import { UserController } from "./src/controllers/UserController";

window.addEventListener("DOMContentLoaded", async () => {
  await Store.init();
  Router.init();
  loadSearchProductForm();
  loadLoginButton();
  loadCreateProductButton();
  loadMyProductsButton();
});

function loadLoginButton() {
  const navbarLoginButton = document.querySelector("#navbarLoginButton");

  if (!navbarLoginButton) {
    throw new Error("navbarLoginButton not found");
  }

  navbarLoginButton.addEventListener("click", () => {
    if (Store.user !== null) {
      Router.goToPath(`/profile?id=${Store.user.id}`);
      return;
    }

    handleLogin();
  });
}

function loadSearchProductForm() {
  const navbarSearchForm = document.querySelector("#navbarSearchForm");

  if (!navbarSearchForm) {
    throw new Error("navbarSearchForm not found");
  }

  navbarSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries((formData as any).entries());
    const searchQuery = formDataObject.searchQuery.trim();

    if (!searchQuery) {
      Router.goToPath("/products");
      return;
    }

    Router.goToPath(`/products?q=${searchQuery}`);
  });
}

function loadCreateProductButton() {
  const createProductButton = document.getElementById(
    "navbarCreateProductButton",
  );

  if (!createProductButton) {
    throw new Error("createProductButton not found");
  }

  createProductButton.addEventListener("click", () => {
    const isUserLoggedIn = Store.user !== null;

    if (!isUserLoggedIn) {
      console.log("USER IS NOT LOGGED");
      handleLogin();
      return;
    }

    handleCreateProduct();
  });
}

function handleCreateProduct() {
  const { closeModal } = createModal(
    "createProductModal",
    getCreateProductModal(),
  );

  const createProductForm = document.querySelector("#createProductForm");

  if (!createProductForm) {
    throw new Error("createProductForm not found");
  }

  createProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries((formData as any).entries());

    const formattedPrice = formatPriceToCents(formDataObject.price);
    if (!formattedPrice) {
      return;
    }

    if (auth.currentUser === null) {
      throw new Error("Error while getting current user");
    }

    const newProduct: ProductType = {
      id: uuid(),
      name: formDataObject.name,
      description: formDataObject.description,
      priceInCents: formattedPrice,
      category: formDataObject.category,
      image: formDataObject.image,
      ownedBy: auth.currentUser?.uid,
    };

    await ProductController.createProduct(newProduct);
    await UserController.addProductToUser(newProduct);
    closeModal();

    const urlPath = window.location.pathname;
    if (urlPath.includes("products")) {
      window.location.reload();
    }
  });
}

function loadMyProductsButton() {
  const myProductsButton = document.querySelector("#navbarMyProductsButton");

  if (!myProductsButton) {
    throw new Error("myProductsButton not found");
  }

  myProductsButton.addEventListener("click", () => {
    if (Store.user === null) {
      handleLogin();
      return;
    }

    Router.goToPath(`/profile?id=${Store.user.id}`);
  });
}

function getCreateProductModal() {
  return `
    <form class="flex flex-col gap-4" id="createProductForm">
      <h2 class="text-xl font-medium">Anúnciar produto</h2>
      <div class="flex flex-col gap-2">
        <label htmlFor="name">
          Nome
        </label>
        <input name="name" class="border p-2 rounded-lg border-neutral-200" type="text" id="name" placeholder="Nome do produto" required />
      </div>
      <div class="flex flex-col gap-2">
        <label htmlFor="description">
          Descrição
        </label>
        <textarea class="border p-2 rounded-lg border-neutral-200 max-h-[200px]" name="description" id="description" required></textarea>
      </div>
      <div class="flex flex-col gap-2">
        <label htmlFor="price">
          Preço
        </label>
        <input name="price" class="border p-2 rounded-lg border-neutral-200" type="text" id="price" placeholder="Preço do produto" required/>
      </div>
      <div class="flex flex-col gap-2">
        <label htmlFor="image">
          Imagem
        </label>
        <input name="image" class="border p-2 rounded-lg border-neutral-200" type="text" id="image" placeholder="Imagem do produto" required />
      </div>
      <div class="flex flex-col gap-2">
        <label htmlFor="category">
          Categoria
        </label>
        <select name="category" id="category" class="border p-2 rounded-lg border-neutral-200">
          <option value="gardening">Jardinagem</option>
          <option value="cleaning">Limpeza</option>
          <option value="construction">Contrução</option>
          <option value="painting">Pintura</option>
          <option value="electrical">Elétrica</option>
          <option value="other">Outra</option>
        </select>
      </div>
      <button class="bg-primary text-white-custom py-3 px-5 rounded-lg w-fit mx-auto min-w-[200px] hover:bg-secondary transition-all duration-300 ease-in-out" type="submit">Adicionar</button>
    </form>
  `;
}
