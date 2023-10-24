export const Router = {
  init() {
    const pageLinks = document.querySelectorAll(".pageLink");
    pageLinks.forEach((pageLink) => {
      pageLink.addEventListener("click", (event) => {
        event.preventDefault();
        const href = pageLink.getAttribute("href");

        if (!href) {
          throw new Error("Error while loading href");
        }

        Router.goToPath(href);
      });
    });

    window.addEventListener("popstate", (event) => {
      console.log("Pop state", event.state);
      Router.goToPath(event.state, false);
    });

    const search = location.search;
    Router.goToPath(`${location.pathname}${search}`);
  },

  enhenceAllLinks() {
    const appPage = document.querySelector("#app");
    const pageLinks = appPage?.querySelectorAll("a");
    pageLinks?.forEach((pageLink) => {
      pageLink.addEventListener("click", (event) => {
        event.preventDefault();
        const href = pageLink.getAttribute("href");

        if (!href) {
          throw new Error("Error while loading href");
        }

        Router.goToPath(href);
      });
    });
  },

  removeAllParams() {
    console.log("Removing all params");
    const currentURL = new URL(window.location.href);
    currentURL.search = "";
    Router.goToPath(currentURL.pathname, true);
  },

  goToPath(router: string, addToHistory: boolean = true) {
    console.log("Navigating to", router);

    const url = new URL(router, window.location.origin);
    const params = new URLSearchParams(url.search);
    let pageContent = null;

    switch (url.pathname) {
      case "/":
        pageContent = document.createElement("home-page");
        break;
      case "/products":
        pageContent = document.createElement("products-page");
        pageContent.dataset.query = params.get("q") || "";
        pageContent.dataset.category = params.get("category") || "";
        pageContent.dataset.price = params.get("price") || "";
        pageContent.dataset.distance = params.get("distance") || "";
        break;
      case "/product":
        pageContent = document.createElement("product-page");
        const id = params.get("id");
        if (!id) {
          console.error("Product id not found");
          pageContent = document.createElement("not-found-page");
        } else {
          pageContent.dataset.id = id;
        }
        break;
      case "/register":
        pageContent = document.createElement("register-page");
        break;
      case "/profile":
        pageContent = document.createElement("profile-page");
        break;
      default:
        pageContent = document.createElement("not-found-page");
        break;
    }

    if (addToHistory) {
      history.pushState(router, "", router);
    }

    if (!pageContent) {
      throw new Error("Page content not found");
    }

    const app = document.querySelector("#app");

    if (!app) {
      throw new Error("App not found");
    }

    app.innerHTML = "";
    app.appendChild(pageContent);
    window.scrollTo(0, 0);
    Router.enhenceAllLinks();
  },
};
