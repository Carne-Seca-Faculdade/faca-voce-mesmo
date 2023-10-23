import { UserController } from "../controllers/UserController";
import { Router } from "../services/Router";
import { Store } from "../services/Store";
import { createModal } from "./createModal";

function getLoginModal() {
  return `
    <form class="flex flex-col gap-4" id="loginForm">
      <h2 class="text-xl font-medium">Login</h2>
      <div class="flex flex-col gap-2">
        <label htmlFor="email">
          E-mail
        </label>
        <input name="email" class="border p-2 rounded-lg border-neutral-200" type="email" id="email" placeholder="E-mail" required />
      </div>
      <div class="flex flex-col gap-2">
        <label htmlFor="password">
          Senha
        </label>
        <input name="password" class="border p-2 rounded-lg border-neutral-200" type="password" id="password" placeholder="Senha" required/>
      </div>
      <button class="bg-primary text-white-custom py-3 px-5 rounded-lg w-fit mx-auto min-w-[200px] hover:bg-secondary transition-all duration-300 ease-in-out" type="submit">Entrar</button>
      <p class="text-center">Não tem uma conta? <a href="/register" id="registerButton" class="text-primary">Cadastre-se</a></p>
    </form>
  `;
}

export function handleLogin() {
  const { closeModal } = createModal("loginModal", getLoginModal());
  const currentURL = new URL(window.location.href);

  const registerButton = document.querySelector("#registerButton");
  const loginForm = document.querySelector("#loginForm");

  if (!loginForm || !registerButton) {
    throw new Error("Error initializing login modal");
  }

  registerButton?.addEventListener("click", (event) => {
    event.preventDefault();

    if (currentURL.pathname === "/register") {
      closeModal();
      return;
    }

    closeModal();
    Router.goToPath("/register");
  });

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries((formData as any).entries());
    const navbarLoginButton = document.querySelector("#navbarLoginButton");
    const { email, password } = formDataObject;
    const response = await UserController.loginUser(email, password);

    if (response) {
      alert(response);
      return;
    }

    if (!navbarLoginButton) {
      throw new Error("navbarLoginButton not found");
    }

    if (Store.user === null) {
      throw new Error("Error while logging in");
    }

    navbarLoginButton.textContent = Store.user.name;
    closeModal();
  });
}
