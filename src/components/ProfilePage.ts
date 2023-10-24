import { UserType } from "../@types/UserType";
import { ProductsController } from "../controllers/ProductsController";
import { Store } from "../services/Store";

const getProfileTemplate = (user: UserType) => {
  return `
    <div class="p-[20px] md:p-[50px] min-h-[100svh-80px] flex flex-col lg:flex-row gap-4 ">
      <aside class="md:min-w-[400px]">
        <div class="flex flex-col border border-neutral-300 rounded-lg p-2 gap-2 max-w-[400px]">
          <div class="justify-between flex items-center gap-2 mb-2>
            <span class="font-medium text-black">${user.name}</span>
            <button title="Compartilhar perfil">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
          </div>
          <div>
            <i class="fa-regular fa-calendar"></i>
            <span>Na FVM desde 2023</span>
          </div>
          <div>
            <i class="fa-solid fa-location-dot"></i>
            <span>Foz do Iguaçu - PR</span>
          </div>
        </div>
      </aside>
      <div class="flex flex-col gap-2 flex-1">
        <h2 class="text-lg font-medium text-black">Anúncios do vendedor</h2>
        <span>8 anúncios publicados</span>
        <div>
          <div class="flex items-center justify-between flex-wrap gap-y-1 gap-x-8">
            <div class="flex-1 flex items-center gap-2 text-black p-2 border border-neutral-300 rounded-lg max-w-[400px]">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" class="w-full" placeholder="Ex: Fiat Uno" />
            </div>
            <div class="flex items-center gap-2"> 
              <button class="border rounded-lg p-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out min-w-[36px] min-h-[36px] text-base">
                <i class="fa-solid fa-filter"></i>
              </button>
              <button class="min-w-[36px] min-h-[36px] border rounded-lg p-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out text-base">
                <i class="fa-solid fa-table-cells-large"></i>
              </button>
              <button class="border rounded-lg p-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out">
                Ordenar por
                <i class="fa-solid fa-angle-down"></i>
              </button>
            </div>
          </div>
          <section class="products" id="productsContainer"></section>
        </div>
      </div>
    </div>
  `;
};

export class ProfilePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    const user = Store.user;

    if (!user) {
      throw new Error("User not found");
    }

    const userProducts = this.loadUserData(user);
    this.innerHTML = getProfileTemplate(user);
    ProductsController.renderProducts(userProducts);
  }

  private loadUserData(user: UserType) {
    const userProducts = Store.products.filter(
      (product) => product.ownedBy === user.id,
    );

    return userProducts;
  }
}

customElements.define("profile-page", ProfilePage);
