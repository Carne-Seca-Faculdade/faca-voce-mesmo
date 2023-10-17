export const Router = {
  init: () => {
    const navbarLinks = document.querySelectorAll("a.navbarLink");
    navbarLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const linkPath = link.getAttribute("href");
        Router.go(linkPath);
      });
    });
  },
  go: (path, addToHistory = true) => {
    console.log(`Navigating to ${path}`);
  },
};
