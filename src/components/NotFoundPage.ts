import { Router } from "../services/Router";

const notFoundPageTemplate = `
  <div class="flex flex-col items-center justify-center min-h-[calc(100svh-80px)] text-center p-10">
    <div class="max-w-[400px]">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-lg mb-2">A página que você está procurando não foi encontrada.</p>
      <primary-button>Home</primary-button>
    </div>
  </div>
`;

export class NotFoundPage extends HTMLElement {
  private _homeButton: HTMLButtonElement | null = null;

  connectedCallback() {
    this.innerHTML = notFoundPageTemplate;

    this.initializeElements();
    this.loadEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  initializeElements() {
    this._homeButton = this.querySelector("primary-button");
  }
  loadEventListeners() {
    if (!this._homeButton) {
      throw new Error("Home button not found");
    }

    this._homeButton.addEventListener("click", () => {
      Router.goToPath("/");
    });
  }
  removeEventListeners() {
    if (!this._homeButton) {
      throw new Error("Home button not found");
    }

    this._homeButton.removeEventListener("click", () => {
      Router.goToPath("/");
    });
  }
}

customElements.define("not-found-page", NotFoundPage);
