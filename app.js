import { Router } from "./src/services/Router";
import { Store } from "./src/services/Store";

window.app = {
	store: Store,
	router: Router,
};

window.addEventListener("DOMContentLoaded", async () => {
	console.log("DOM loaded");
});
