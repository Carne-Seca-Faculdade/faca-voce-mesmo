export const Router = {
	init: () => {
		const navbarLinks = document.querySelectorAll("a.navbarLink");
		navbarLinks.forEach((link) => {
			link.addEventListener("click", (event) => {
				event.preventDefault();
				const linkPath = link.getAttribute("href");
				Router.goToPath(linkPath);
			});
		});

		Router.goToPath(location.pathname);
	},

	goToPath: (path, addToHistory = true) => {
		console.log(`Navigating to ${path}`);

		if (addToHistory) {
			history.pushState({ path }, "", path);
		}

		let pageContent = null;
		switch (path) {
			case "/":
				pageContent = `
					<h1>Home</h1>
				`;
				break;
			case "/products":
				pageContent = `
					<h1>Products</h1>
				`;
				break;
			case "/login":
				pageContent = `
					<h1>Login</h1>
				`;
				break;
			case "/register":
				pageContent = `
					<h1>Register</h1>
				`;
				break;
		}

		if (!pageContent) return;

		console.log("PAGE CONTENT IS ");
		console.log(pageContent.trim());

		const appContainer = document.querySelector("#app");
		appContainer.appendChild = pageContent;
	},
};
