// import { UserType } from "../@types/UserType";

/* function getProfilePageTemplate(user: UserType) {
  return `
    <div>
      <aside class="sidebar">
        <div class="user-info">
          <div>
            <span class="user__name">${user.name}</span>
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
      <div class="profile-content">
        <h2>Anúncios do vendedor</h2>
        <span>8 anúncios publicados</span>
        <div>
          <div class="products__filters">
            <div class="search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Ex: Fiat Uno" />
            </div>
            <div>
              <button class="button-icon">
                <i class="fa-solid fa-filter"></i>
              </button>
              <button class="button-icon">
                <i class="fa-solid fa-table-cells-large"></i>
              </button>
              <button class="filters__order-by-button">
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
}
 */
export class ProfilePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="text-5xl text-secondary">
        <i class="fa-solid fa-spinner animate-spin"></i>
      </div>
    `;
  }
}
