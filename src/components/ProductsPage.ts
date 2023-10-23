import "./PrimaryButton";
import { createModal } from "../utils/createModal";
import { getLocalStorage } from "../utils/getLocalStorage";
import { Router } from "../services/Router";
import { ProductType } from "../@types/ProductType";
import { Store } from "../services/Store";
import { ProductsController } from "../controllers/ProductsController";

const productsPageTemplate = `
    <div class="p-[20px] md:p-[50px] min-h-[400px] flex flex-col">
      <div class="flex items-center justify-between flex-wrap gap-y-1 gap-x-8">
        <h2 class="font-medium text-text-black mb-2 text-lg md:text-xl">Produtos disponíveis</h2>
        <div class="flex items-center w-full justify-between gap-2 sm:justify-center sm:w-fit">
          <div class="flex gap-2">
            <button
              class="min-w-[36px] min-h-[36px] border border-neutral-200 p-2 flex items-center justify-center transition-all duration-300 ease-in-out hover:opacity-80 rounded-lg"
              title="Abrir menu de filtros"
              id="filterModalButton"
            >
              <i class="fa-solid fa-filter"></i>
            </button>
          </div>
          <div class="border relative border-neutral-200 flex flex-col items-center justify-center transition-all gap-4 duration-300 ease-in-out rounded-lg min-h-[36px] cursor-pointer">
            <button id="sortByButton" class="flex items-center justify-center gap-4 p-2">Ordenar por <i class="fa-solid fa-sort"></i></i></button>
            <div class="hidden absolute bg-white-custom shadow rounded-lg z-[999] bottom-full mb-2 overflow-hidden" id="sortByOptionsContainer">
              <button id="sortByBiggestPriceButton" class="p-2 text-black transition-all duration-300 ease-in-out hover:bg-gray-100 w-full text-center">Maior Preço</button>
              <button id="sortBySmallestPriceButton" class="p-2 text-black transition-all duration-300 ease-in-out hover:bg-gray-100 w-full text-center">Menor Preço</button>
            </div>
          </div>
        </div>
      </div>
      <section class="items-center flex justify-center gap-4 py-8 flex-1 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 col-span-12" id="productsContainer">
        <div class="text-5xl text-secondary">
          <i class="fa-solid fa-spinner animate-spin"></i>
        </div>
      </section>
    </div>
`;

export class ProductsPage extends HTMLElement {
  private filterModalButton: HTMLButtonElement | null = null;
  private sortByBiggestPriceButton: HTMLButtonElement | null = null;
  private sortBySmallestPriceButton: HTMLButtonElement | null = null;
  private sortByButton: HTMLButtonElement | null = null;
  private sortByOptionsContainer: HTMLDivElement | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = productsPageTemplate;
    this.initializeElements();
    this.addEventListeners();
    this.loadProducts();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  private handleFilterButtonClick() {
    const filterModal = `
    <form class="flex flex-col gap-4" id="filterModal">
      <h2 class="text-xl font-medium">Filtros</h2>
      <div class="flex flex-col gap-2">
        <label htmlFor="category">
          Categoria
        </label>
        <select name="category" id="category" class="border p-2 rounded-lg border-neutral-200 cursor-pointer">
          <option value="gardening">Jardinagem</option>
          <option value="cleaning">Limpeza</option>
          <option value="construction">Contrução</option>
          <option value="painting">Pintura</option>
          <option value="electrical">Elétrica</option>
          <option value="other">Outra</option>
        </select>
      </div>
      <div class="flex items-center justify-around max-w-[300px] mx-auto gap-5 sm:justify-end sm:max-w-none  sm:mx-0">
      <primary-button type="button" id="cleanFiltersButton">Limpar</primary-button>
        <primary-button type="submit">Aplicar</primary-button>
      </div>
    </form>
  `;

    const { closeModal } = createModal("filterModal", filterModal);

    const filterForm = document.querySelector("#filterModal");
    const cleanFiltersButton = document.querySelector("#cleanFiltersButton");

    if (!filterForm || !cleanFiltersButton) {
      throw new Error("Error while loading filter modal");
    }

    filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const formDataObject = Object.fromEntries((formData as any).entries());

      const currentURL = new URL(window.location.href);
      const mergedSearchParams = new URLSearchParams(currentURL.search);

      for (const [key, value] of Object.entries(formDataObject)) {
        const currentValue = mergedSearchParams.get(key);

        if (currentValue) {
          mergedSearchParams.delete(key);
        }

        mergedSearchParams.set(key, value as string);
      }

      const newURL = `${currentURL.origin}${
        currentURL.pathname
      }?${mergedSearchParams.toString()}`;

      Router.goToPath(newURL);
      closeModal();
    });

    cleanFiltersButton.addEventListener("click", () => {
      Router.removeAllParams();
      closeModal();
    });
  }

  private closeSortByOptions() {
    if (!this.sortByOptionsContainer) {
      throw new Error("Error while closing sort by options");
    }

    this.sortByOptionsContainer.classList.add("hidden");
  }

  private handleSortByBiggestPriceButtonClick = () => {
    ProductsController.sortProductsBy("desc");
    this.closeSortByOptions();
  };

  private handleSortBySmallestPriceButtonClick = () => {
    ProductsController.sortProductsBy("asc");
    this.closeSortByOptions();
  };

  private handleSortByButtonClick() {
    if (!this.sortByButton || !this.sortByOptionsContainer) {
      throw new Error("Error while loading sort by modal");
    }

    this.sortByOptionsContainer.classList.toggle("hidden");
  }

  private initializeElements() {
    this.filterModalButton = this.querySelector("#filterModalButton");
    this.sortByButton = this.querySelector("#sortByButton");
    this.sortByBiggestPriceButton = this.querySelector(
      "#sortByBiggestPriceButton",
    );
    this.sortBySmallestPriceButton = this.querySelector(
      "#sortBySmallestPriceButton",
    );
    this.sortByOptionsContainer = this.querySelector("#sortByOptionsContainer");
  }

  private addEventListeners() {
    if (
      !this.filterModalButton ||
      !this.sortByButton ||
      !this.sortByBiggestPriceButton ||
      !this.sortBySmallestPriceButton ||
      !this.sortByOptionsContainer
    ) {
      throw new Error("Error while loading event listeners");
    }

    this.filterModalButton.addEventListener(
      "click",
      this.handleFilterButtonClick,
    );
    this.sortByButton.addEventListener("click", () =>
      this.handleSortByButtonClick(),
    );
    this.sortByBiggestPriceButton.addEventListener(
      "click",
      this.handleSortByBiggestPriceButtonClick,
    );
    this.sortBySmallestPriceButton.addEventListener(
      "click",
      this.handleSortBySmallestPriceButtonClick,
    );
  }

  private removeEventListeners() {
    if (
      !this.filterModalButton ||
      !this.sortByButton ||
      !this.sortByBiggestPriceButton ||
      !this.sortBySmallestPriceButton ||
      !this.sortByOptionsContainer
    ) {
      throw new Error("Error while removing event listeners");
    }

    this.filterModalButton.removeEventListener(
      "click",
      this.handleFilterButtonClick,
    );
    this.sortByButton.removeEventListener("click", () =>
      this.handleSortByButtonClick(),
    );
    this.sortByBiggestPriceButton.removeEventListener(
      "click",
      this.handleSortByBiggestPriceButtonClick,
    );
    this.sortBySmallestPriceButton.removeEventListener(
      "click",
      this.handleSortBySmallestPriceButtonClick,
    );
  }

  private async loadProducts() {
    let products = Store.products;
    if (products.length === 0) {
      console.log("No products on Store");
      products = getLocalStorage({
        storageKey: "products",
        defaultValue: await ProductsController.loadAllProducts(),
        staleTimeInMinutes: 5,
      });
    }
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const category = params.get("category") || "";
    const query = params.get("q") || "";

    // should be doing this on a query, not on the whole list

    const filteredProducts: ProductType[] = products.filter(
      (product: ProductType) => {
        if (category && category !== "all" && query) {
          return (
            product.category === category &&
            product.name.toLowerCase().includes(query.toLowerCase())
          );
        } else if (category && category !== "all") {
          return product.category === category;
        } else if (query) {
          return product.name.toLowerCase().includes(query.toLowerCase());
        } else {
          return true;
        }
      },
    );

    ProductsController.renderProducts(filteredProducts);
  }
}

customElements.define("products-page", ProductsPage);
