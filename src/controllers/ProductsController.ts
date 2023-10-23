import "../components/Product";
import { collection, getDocs } from "firebase/firestore";
import { ProductType } from "../@types/ProductType";
import { updateLocalStorage } from "../utils/updateLocalStorage";
import { db } from "../services/config/firebase";
import { Store } from "../services/Store";
import { Router } from "../services/Router";

async function loadAllProducts() {
  try {
    console.log("Fetching products from db");
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const products = productsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as ProductType,
    );
    updateLocalStorage({
      storageKey: "products",
      value: { data: products, saveAt: Date.now() },
    });
    Store.products = products;
    return products;
  } catch (error) {
    throw new Error("Error while fetching products from db");
  }
}

function renderProducts(products: ProductType[]) {
  const productsContainer = document.querySelector("#productsContainer");
  if (!productsContainer) {
    throw new Error("Products container not found");
  }

  productsContainer.innerHTML = "";

  if (products.length === 0) {
    const noProductsContainer = document.createElement("div");
    noProductsContainer.className =
      "flex flex-col items-center justify-center gap-4";

    const noProductsTitle = document.createElement("h1");
    noProductsTitle.classList.add("text-lg");
    noProductsTitle.textContent = "Nenhum produto encontrado";

    const cleanFiltersButton = document.createElement("primary-button");
    cleanFiltersButton.textContent = "Limpar filtros";

    cleanFiltersButton.addEventListener("click", () => {
      Router.removeAllParams();
    });

    noProductsContainer.appendChild(noProductsTitle);
    noProductsContainer.appendChild(cleanFiltersButton);
    productsContainer.appendChild(noProductsContainer);
  } else {
    products.forEach((product) => {
      const productCard = document.createElement("product-card");
      (productCard as any).product = product;
      productsContainer.appendChild(productCard);
    });
    productsContainer.classList.remove("justify-center");
    productsContainer.classList.remove("flex");
    productsContainer.classList.add("justify-start");
    productsContainer.classList.add("grid");
  }
}

function sortProductsBy(sort: "asc" | "desc") {
  const products = Store.products;
  if (sort === "asc") {
    products.sort((a, b) => a.priceInCents - b.priceInCents);
  } else {
    products.sort((a, b) => b.priceInCents - a.priceInCents);
  }
  renderProducts(products);
}

export const ProductsController = {
  loadAllProducts,
  renderProducts,
  sortProductsBy,
};
