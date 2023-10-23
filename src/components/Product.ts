import { ProductType } from "../@types/ProductType";
import { formatPriceToReal, returnRandomDistance } from "../utils/helpers";

function createProductCardTemplate(product: ProductType) {
  return `
    <a href="/product?id=${
      product.id
    }" class="flex flex-col relative overflow-hidden group w-full min-w-[250px] border border-neutral-200 rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
      <button title="Favoritar produto" class="opacity-0 absolute top-2 right-2 flex p-1 text-2xl text-text-white transition-all duration-300 ease-in-out group-hover:opacity-100 hover:opacity-80">
        <i class="fa-regular fa-heart"></i>
      </button>
      <img class="w-full h-auto min-h-[200px] max-h-[200px] object-cover object-top overflow-hidden" src="${
        product.image
      }" />
      <div class="p-4 bg-neutral-100 text-neutral-300 flex-1">
        <h3 class="mb-4">${product.name}</h3>
        <div class="flex items-center justify-between flex-wrap gap-4 text-sm">
          <strong>${formatPriceToReal(product.priceInCents)}</strong>
          <strong>${returnRandomDistance()}</strong>
        </div>
      </div>
    </a>
  `;
}

export class ProductCard extends HTMLElement {
  private _product?: ProductType;

  set product(data) {
    this._product = data;
    this.render();
  }

  get product() {
    return this._product;
  }

  connectedCallback() {
    if (this._product) {
      this.render();
    }
  }

  render() {
    if (!this._product) {
      throw new Error("Product not found");
    }

    this.innerHTML = createProductCardTemplate(this._product);
  }
}

if (!customElements.get("product-card")) {
  customElements.define("product-card", ProductCard);
}
