import { ProductType } from "../@types/ProductType";
import { UserType } from "../@types/UserType";
import { ProductController } from "../controllers/ProductController";
import { UserController } from "../controllers/UserController";
import { Store } from "../services/Store";
import { createModal } from "../utils/createModal";
import { handleLogin } from "../utils/handleLoginModal";

const productPageTemplate = `
  <section class="min-h-[calc(100svh-80px)] flex items-start md:items-center justify-center p-[20px] md:p-[50px]" id="productContainer">
    <div class="text-5xl text-secondary">
      <i class="fa-solid fa-spinner animate-spin"></i>
    </div>
  </section>
`;

export class ProductPage extends HTMLElement {
  private _contactButton: HTMLButtonElement | null = null;
  private _favoriteButton: HTMLButtonElement | null = null;
  private _shareButton: HTMLButtonElement | null = null;
  private _reportButton: HTMLButtonElement | null = null;
  private _product: ProductType | null = null;
  private _isProductLoaded: boolean = false;

  constructor() {
    super();
    this.handleContactButtonClick = this.handleContactButtonClick.bind(this);
  }

  async connectedCallback() {
    this.innerHTML = productPageTemplate;
    await this.loadProduct();
    this.initializeElements();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  private getContactModalHTML(owner: UserType) {
    return `
      <div class="text-lg">
        <h2 class="text-xl font-medium">Contato</h2>
        <p>Nome: ${owner.name}</p>
        <p>Telefone: ${owner.phone}</p>
      </div>
    `;
  }

  private async loadProduct() {
    console.log("loading");
    const product = await ProductController.handleProductLoad();
    ProductController.renderProduct(product);
    this._product = product;

    if (!this._product) {
      throw new Error("Error while loading product");
    }

    this._isProductLoaded = true;

    this.loadEventListeners();
  }

  private initializeElements() {
    this._contactButton = document.querySelector("#productContactButton");
    this._favoriteButton = document.querySelector("#productFavoriteButton");
    this._shareButton = document.querySelector("#productShareButton");
    this._reportButton = document.querySelector("#productReportButton");

    if (
      !this._contactButton ||
      !this._favoriteButton ||
      !this._shareButton ||
      !this._reportButton
    ) {
      throw new Error("Error while initializing elements");
    }

    this.loadEventListeners();
  }

  private loadEventListeners() {
    if (!this._isProductLoaded) {
      return;
    }

    if (
      !this._contactButton ||
      !this._favoriteButton ||
      !this._shareButton ||
      !this._reportButton
    ) {
      console.error(
        "Error while adding listeners: One or more elements not found.",
      );
      return;
    }

    this._contactButton.addEventListener(
      "click",
      this.handleContactButtonClick,
    );
    this._favoriteButton.addEventListener(
      "click",
      this.handleFavoriteButtonClick,
    );
    this._shareButton.addEventListener("click", this.handleShareButtonClick);
    this._reportButton.addEventListener("click", this.handleReportButtonClick);
  }

  private removeEventListeners() {
    if (this._isProductLoaded) {
      if (
        this._contactButton &&
        this._favoriteButton &&
        this._shareButton &&
        this._reportButton
      ) {
        this._contactButton.removeEventListener(
          "click",
          this.handleContactButtonClick,
        );
        this._favoriteButton.removeEventListener(
          "click",
          this.handleFavoriteButtonClick,
        );
        this._shareButton.removeEventListener(
          "click",
          this.handleShareButtonClick,
        );
        this._reportButton.removeEventListener(
          "click",
          this.handleReportButtonClick,
        );
      }
    }
  }

  private handleFavoriteButtonClick() {
    console.log("Favorite button clicked");
  }

  private handleShareButtonClick() {
    console.log("Share button clicked");
  }

  private handleReportButtonClick() {
    console.log("Report button clicked");
  }

  private async handleContactButtonClick() {
    if (Store.user === null) {
      handleLogin();
      return;
    }

    if (!this._product) {
      throw new Error("Error while loading product");
    }

    const productOwner = await UserController.getUserById(
      this._product?.ownedBy,
    );

    if (!productOwner) {
      throw new Error("Error while loading product owner");
    }

    createModal("contactModal", this.getContactModalHTML(productOwner));
  }
}

customElements.define("product-page", ProductPage);
