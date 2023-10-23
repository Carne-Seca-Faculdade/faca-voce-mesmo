import { twMerge } from "tailwind-merge";

export class PrimaryButton extends HTMLElement {
  static get observedAttributes() {
    return ["type", "color", "id", "class"];
  }

  connectedCallback() {
    const buttonElement = document.createElement("button");
    buttonElement.className =
      "px-5 py-3 transition-all duration-300 ease-in-out rounded-lg bg-primary text-white-custom w-fit hover:bg-secondary";

    if (this.hasAttribute("id")) {
      const id = this.getAttribute("id");

      if (!id) {
        throw new Error("Id not found");
      }

      buttonElement.setAttribute("id", id);
    }

    if (this.hasAttribute("type")) {
      const type = this.getAttribute("type");

      if (!type) {
        throw new Error("Type not found");
      }

      buttonElement.setAttribute("type", type);
    }

    if (this.hasAttribute("color")) {
      const color = this.getAttribute("color");

      if (!color) {
        throw new Error("Color not found");
      }

      buttonElement.classList.add(color);
    }

    if (this.hasAttribute("class")) {
      const className = this.getAttribute("class");

      if (!className) {
        throw new Error("Class not found");
      }

      const previousClasses = buttonElement.className;
      buttonElement.className = twMerge(previousClasses, className);
    }

    while (this.firstChild) {
      buttonElement.appendChild(this.firstChild);
    }

    this.appendChild(buttonElement);
  }
}

customElements.define("primary-button", PrimaryButton);
