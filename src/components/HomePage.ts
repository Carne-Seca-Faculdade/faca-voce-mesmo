const template = `
  <div>
    <section class="carrosel">
      <div class="hero">
        <div class="hero-text">
        <h1 class="text-2xl md:text-5xl text-secondary font-bold mb-2">Faça Você Mesmo</h1>
        <h2 class="hero__title">Compre, alugue e divulgue suas ferramentas</h2>
        <p class="hero__description">
          A <abbr title="Faça Você Mesmo">FVM</abbr> conecta você com vendedores
          de ferramentas de todo o país. Compre, venda e encontre exatamente o
          que precisa para seu próximo projeto.
        </p>
        <a
          class="primary-button pageLink"
          title="Clique para ver os anúncios"
          href="/products"
        >
          Ver Anúncios
        </a>
      </div>
      </div>
      <div class="carrosel-container">
        <div class="carrosel-slider">
          <div class="slide">
            <img
              src="src/assets/images/testImage1.webp"
              alt="Slide 1"
            />
          </div>
          <div class="slide">
            <img
              src="src/assets/images/testImage2.webp"
              alt="Slide 2"
            />
          </div>
          <div class="slide">
            <img
              src="src/assets/images/testImage3.webp"
              alt="Slide 3"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="about-container">
      <h2>Sobre Nós</h2>
      <ul>
        <li>
          <h3>Compra e Venda</h3>
          <p>
            Nossa plataforma foi criada para facilitar a transação de
            ferramentas, conectando compradores e vendedores em um ambiente
            seguro e confiável. Valorizamos a qualidade, a transparência e a
            satisfação em cada negócio realizado.
          </p>
        </li>
        <li>
          <h3>Acesso Simplificado</h3>
          <p>
            Entendemos a importância de uma experiência do usuário eficaz. Por
            isso, priorizamos um design intuitivo e recursos ágeis, garantindo
            que você encontre o que procura com facilidade e rapidez, seja no
            desktop ou no celular.
          </p>
        </li>
        <li>
          <h3>Produtos Acessíveis</h3>
          <p>
            Nossa motivação inicial foi criar um espaço onde pessoas pudessem
            encontrar ferramentas de qualidade, muitas vezes usadas, a preços
            mais acessíveis. Ao conectar vendedores e compradores, facilitamos o
            acesso a produtos de valor com custos reduzidos, beneficiando ambas
            as partes.
          </p>
        </li>
      </ul>

      <a
        class="primary-button pageLink"
        title="Clique para ver mais"
        href="/products"
      >
        Saiba mais
      </a>
    </section>

    <section class="section">
      <h2 class="section-title mb-8">Ferramentas Mais Alugadas</h2>
      <ul class="flex items-center justify-center gap-4 flex-wrap max-w-[500px] md:max-w-[900px] lg:max-w-[1200px]">
        <li>
          <a href="/products" class="flex items-center justify-center overflow-hidden text-center rounded-lg bg-neutral-100 flex-col hover:scale-105 transition-all duration-300 ease-in-out">
            <img src="src/assets/images/andaimes.jpg" alt="Equipamento 1" />
            <div class="p-4 flex items-center justify-center" >
              <h3>Andaimes</h3>
            </div>
          </a>
        </li>
        <li>
          <a href="/products" class="flex items-center justify-center overflow-hidden text-center rounded-lg bg-neutral-100 flex-col hover:scale-105 transition-all duration-300 ease-in-out">
            <img
              src="src/assets/images/compactador.jpg"
              alt="Equipamento 2"
            />
            <div class="p-4 flex items-center justify-center" >
              <h3>Compactadores</h3>
            </div>
          </a>
        </li>
        <li>
          <a href="/products" class="flex items-center justify-center overflow-hidden text-center rounded-lg bg-neutral-100 flex-col hover:scale-105 transition-all duration-300 ease-in-out">
            <img src="src/assets/images/betoneira.jpg" alt="Equipamento 3"/>
            <div class="p-4 flex items-center justify-center" >
              <h3>Furadeiras</h3>
            </div>
          </a>
        </li>
        <li>
          <a href="/products" class="flex items-center justify-center overflow-hidden text-center rounded-lg bg-neutral-100 flex-col hover:scale-105 transition-all duration-300 ease-in-out">
            <img src="src/assets/images/demolição.jpg" alt="Equipamento 3" />
            <div class="p-4 flex items-center justify-center" >
              <h3>Demolidores</h3>
            </div>
          </a>
        </li>
      </ul>
    </section>

    <section class="tools-container">
      <h2>Categorias</h2>

      <section class="tools-container__content">
        <a
          class="tools-container__card pageLink hover:scale-105 transition-all duration-300 ease-in-out"
          href="/products?category=gardening"
        >
          <img
            class="card__image"
            src="/src/assets/images/categoriaJardinagemImage.webp"
            alt="Categoria de Jardinagem"
          />
          <div class="card__content">
            <h3>Jardinagem</h3>
          </div>
        </a>
        <a
          class="tools-container__card pageLink hover:scale-105 transition-all duration-300 ease-in-out"
          href="/products?category=construction"
        >
          <img
            class="card__image"
            src="/src/assets/images/categoriaConstrucaoImage.webp"
            alt="Categoria de Construção"
          />
          <div class="card__content">
            <h3>Construção</h3>
          </div>
        </a>
        <a
          class="tools-container__card pageLink hover:scale-105 transition-all duration-300 ease-in-out"
          href="/products?category=cleaning"
        >
          <img
            class="card__image"
            src="/src/assets/images/categoriaLimpezaImage.webp"
            alt="Categoria de Limpeza"
          />
          <div class="card__content">
            <h3>Limpeza</h3>
          </div>
        </a>
      </section>

      <a
        class="primary-button pageLink"
        title="Clique para ver todas as categorias"
        href="/products?category=all"
      >
        Ver Categorias
      </a>
    </section>
  </div>
`;

export class HomePage extends HTMLElement {
  private isTransitioning = false;
  private slider: HTMLDivElement | null = null;
  private nextSlideTimeoutRef: NodeJS.Timeout | null = null;
  private slideTimeoutRef: NodeJS.Timeout | null = null;

  constructor() {
    super();

    this.nextSlide = this.nextSlide.bind(this);
  }

  connectedCallback() {
    this.render();
    this.loadEvents();
  }

  disconnectedCallback() {
    document.removeEventListener("DOMContentLoaded", this.loadSlider);
    this.nextSlideTimeoutRef && clearTimeout(this.nextSlideTimeoutRef);
    this.slideTimeoutRef && clearInterval(this.slideTimeoutRef);
  }

  private nextSlide() {
    if (!this.slider) {
      throw new Error("Error loading slider");
    }

    if (!this.isTransitioning) {
      this.isTransitioning = true;
      this.slider.style.transition = "transform 0.5s ease-in-out";
      this.slider.style.transform = "translateX(-100%)";

      this.nextSlideTimeoutRef = setTimeout(() => {
        const firstSlide = document.querySelector(".slide:first-child");

        if (!firstSlide || !this.slider) {
          throw new Error("Error loading first slide");
        }

        this.slider.style.transition = "none";
        this.slider.style.transform = "translateX(0)";
        this.slider.appendChild(firstSlide);
        this.isTransitioning = false;
      }, 500);
    }
  }

  private loadSlider() {
    this.slider = document.querySelector(".carrosel-slider");

    if (!this.slider) {
      throw new Error("Error loading slider");
    }

    // this.slideTimeoutRef = setInterval(() => this.nextSlide(), 3000);
  }

  private loadEvents() {
    this.loadSlider();
  }

  private render() {
    this.innerHTML = template;
  }
}

customElements.define("home-page", HomePage);
