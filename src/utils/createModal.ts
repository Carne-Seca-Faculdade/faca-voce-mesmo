export function createModal(modalId: string, modalContent: string) {
  const body = document.body;
  const pageHasScroll = body.scrollHeight > window.innerHeight;
  body.style.overflow = "hidden";

  if (pageHasScroll) {
    body.style.paddingRight = "0.5rem";
  }

  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black/60 z-[99999]";
  modal.id = modalId;

  const modalContentWrapper = `
    <div class="relative bg-white-custom rounded-lg w-[90vw] p-4 max-w-[500px] max-h-[90vh] overflow-y-auto overflow-x-hidden">
      <button class="absolute top-2 right-2 bg-white-custom shadow-lg flex items-center justify-center py-2 px-2.5 rounded-full text-xl" id="close${modalId}">
        <i class="fa-solid fa-xmark"></i>
      </button>
      ${modalContent}
    </div>
  `;

  modal.innerHTML = modalContentWrapper;
  document.body.appendChild(modal);

  const removeChild = () => {
    const hasBodyModal = document.body.contains(modal);

    if (!hasBodyModal) {
      return;
    }

    body.style.overflow = "auto";
    body.style.paddingRight = "0";
    document.body.removeChild(modal);
  };
  const modalCloseButton = document.querySelector(`#close${modalId}`);

  if (!modalCloseButton) {
    throw new Error("Error while loading event listeners");
  }

  modalCloseButton.addEventListener("click", () => {
    removeChild();
  });

  modal.addEventListener("click", (event) => {
    const isClickOutsideModal = event.target === modal;
    if (isClickOutsideModal) {
      removeChild();
    }
  });

  window.addEventListener("keydown", (event) => {
    const isModalOpen = !modal.classList.contains("hidden");
    if (event.key === "Escape" && isModalOpen) {
      removeChild();
    }
  });

  return {
    closeModal: removeChild,
  };
}
