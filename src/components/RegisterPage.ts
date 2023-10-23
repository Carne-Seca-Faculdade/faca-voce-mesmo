import { UserController } from "../controllers/UserController";

const template = `
  <div class="flex items-center justify-center p-[20px] md:p-[50px] bg-[url('/src/assets/images/loginBanner.webp')] bg-cover min-h-[calc(100svh-80px)]">
    <form id="registerForm" class="max-w-[500px] bg-white-custom p-4 md:max-w-[600px] rounded-lg my-2">
      <h1 class="mb-8 font-medium text-center md:text-xl">Aproveite o melhor do nosso site, cadastrando-se</h1>
      <div class="flex flex-col gap-1 mb-3 border-b">
        <label class="font-medium" for="name">
          Nome: <span class="font-semibold text-red-500">*</span>
        </label>
        <input
          class="px-1 py-2"
          type="text"
          name="name"
          id="name"
          placeholder="Digite seu nome"
          required
        />
      </div>
      <div class="flex flex-col gap-1 mb-3 border-b">
        <label class="font-medium" for="email">
          E-mail: <span class="font-semibold text-red-500">*</span>
        </label>
        <input
          class="px-1 py-2"
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail"
          required
        />
      </div>
      <div class="flex flex-col gap-1 mb-3 border-b">
        <label class="font-medium" for="phone">
          Telefone: <span class="font-semibold text-red-500">*</span>
        </label>
        <input
          class="px-1 py-2"
          type="text"
          name="phone"
          id="phone"
          placeholder="99 9999-9999"
          required
          pattern="[0-9]{2} [0-9]{4}-[0-9]{4}"
        />
      </div>
      <div class="flex flex-col gap-1 mb-3 border-b">
        <label class="font-medium" for="address">
          Endereço: <span class="font-semibold text-red-500">*</span>
        </label>
        <input
          class="px-1 py-2"
          type="text"
          name="address"
          id="address"
          placeholder="Digite seu endereço"
          required
        />
      </div>
      <div class="flex flex-col gap-1 mb-3 border-b">
        <label class="font-medium" for="password">
          Senha: <span class="font-semibold text-red-500">*</span>
        </label>
        <input
          class="px-1 py-2"
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <div class="flex items-center gap-2">
        <input class="px-1 py-2" type="checkbox" name="agreement" id="agreement" required>
        <label class="font-medium" for="agreement">Eu concordo com os termos de uso <span class="font-semibold text-red-500">*<span></label>
      </div>
      <primary-button class="w-full mt-4">Cadastrar</primary-button>
    </form>
  </div>
`;

export class RegisterPage extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = template;
    this.loadEventListeners();
  }

  private loadEventListeners() {
    const registerForm = document.querySelector("#registerForm");

    if (!registerForm) {
      throw new Error("Register form not found");
    }

    registerForm.addEventListener("submit", this.handleFormSubmit);
  }

  private async handleFormSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries((formData as any).entries());
    const { name, email, phone, address, password } = formDataObject;

    try {
      await UserController.registerUser({
        name,
        email,
        phone,
        address,
        password,
      });
      const navbarLoginButton = document.querySelector("#navbarLoginButton");
      if (!navbarLoginButton) {
        throw new Error("navbarLoginButton not found");
      }

      navbarLoginButton.textContent = name;
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário");
    }
  }
}

customElements.define("register-page", RegisterPage);
