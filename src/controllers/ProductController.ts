import { doc, getDoc, setDoc } from "firebase/firestore";
import { ProductType } from "../@types/ProductType";
import { formatPriceToReal, returnRandomDistance } from "../utils/helpers";
import { createModal } from "../utils/createModal";
import { UserController } from "./UserController";
import { db } from "../services/config/firebase";
import { ProductsController } from "./ProductsController";

async function handleProductLoad() {
  const URLQueryString = window.location.search;
  const URLQueryParams = new URLSearchParams(URLQueryString);
  const productId = URLQueryParams.get("id");

  if (!productId) {
    throw new Error("Product ID not found");
  }

  const product = await ProductController.loadProductById(productId);
  return product;
}

async function loadProductById(productId: string) {
  try {
    const productDocRef = doc(db, `products/${productId}`);
    const productDocSnap = await getDoc(productDocRef);
    if (productDocSnap.exists()) {
      return productDocSnap.data() as ProductType;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    throw new Error(`Error loading product: ${error}`);
  }
}

function getProductHTML(product: ProductType) {
  return `
    <article class="flex flex-1 flex-col gap-4 items-center justify-center md:items-stretch w-full max-w-[500px] md:max-w-[1200px] text-center mx-auto md:flex-row md:text-left">
      <div class="rounded-lg overflow-hidden max-w-[500px] lg:min-w-[500px] min-w-[300px]">
        <img src="${product.image}" alt="${
          product.name
        }" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col gap-2 flex-1 justify-between">
        <div>
          <h2 class="text-lg font-medium mb-1 md:text-xl">${product.name}</h2>
          <p class="md:text-lg">${product.description}</p>
        </div>
        <div class="flex flex-col gap-1">
          <strong class="text-xl">${formatPriceToReal(
            product.priceInCents,
          )}</strong>
          <p class="text-lg">À <strong>${returnRandomDistance()}</strong> de distância</p>
          <div class="flex items-center justify-center md:justify-start gap-2 text-lg">
            <i class="fa-solid fa-location-dot"></i>
            <span>Foz do Iguaçu - PR</span>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between md:flex-row gap-2 my-2 ">
          <div class="flex flex-col items-center justify-center md:flex-row gap-2 w-full md:w-fit">
            <button  title="Favoritar produto" class="hover:text-secondary hover:border-secondary flex items-center gap-2 bg-transparent text-primary border py-3 px-5 rounded-lg transition-all duration-300 ease-in-out border-primary w-full md:w-fit" id="productFavoriteButton">
              <i class="fa-solid fa-heart"></i>
              <span class="md:hidden">Favoritar</span>
            </button>
            <button title="Compartilhar produto" class="hover:text-secondary hover:border-secondary flex items-center gap-2 bg-transparent text-primary border py-3 px-5 rounded-lg transition-all duration-300 ease-in-out border-primary w-full md:w-fit" id="productShareButton">
              <i class="fa-solid fa-share-nodes"></i>
              <span class="md:hidden">Compartilhar</span>
            </button>
            <button title="Denunciar produto" class="hover:text-secondary hover:border-secondary flex items-center gap-2 bg-transparent text-primary border py-3 px-5 rounded-lg transition-all duration-300 ease-in-out border-primary w-full md:w-fit" id="productReportButton">
              <i class="fa-solid fa-flag"></i>
              <span class="md:hidden">Denunciar</span>
            </button>
          </div>
          <primary-button class="w-full md:w-fit" id="productContactButton">Contato</primary-button>
        </div>
      </div>
    </article>
  `;
}

function renderProduct(product: ProductType) {
  const productContainer = document.getElementById("productContainer");

  if (!productContainer) {
    throw new Error("Product container not found");
  }

  productContainer.innerHTML = getProductHTML(product);
}

async function onRenderDone(product: ProductType) {
  const productContactButton = document.querySelector("#productContactButton");
  const ownerData = await UserController.getUserById(product.ownedBy);

  if (!ownerData) {
    throw new Error("Error while loading owner data");
  }

  if (!productContactButton) {
    throw new Error("Error while loading event listeners");
  }

  productContactButton.addEventListener("click", () => {
    createModal(
      "contactModal",
      `
      <div>
        <h2 class="text-center text-2xl font-bold mb-4">Contato</h2>
        <span>Nome: ${ownerData.name}</span>
      </div>
    `,
    );
  });
}

async function createProduct(newProduct: ProductType) {
  try {
    const docRef = doc(db, `products/${newProduct.id}`);
    await setDoc(docRef, newProduct);
    await ProductsController.loadAllProducts();
    console.log("Product created successfully");
  } catch (error) {
    throw new Error(`Error creating product: ${error}`);
  }
}

export const ProductController = {
  handleProductLoad,
  loadProductById,
  renderProduct,
  onRenderDone,
  createProduct,
};
