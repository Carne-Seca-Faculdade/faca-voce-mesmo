import { StoreType } from "../@types/StoreType";
import { UserController } from "../controllers/UserController";
import { getLocalStorage } from "../utils/getLocalStorage";
import { auth } from "./config/firebase";

declare global {
  interface Window {
    app: {
      store: StoreType;
    };
  }
}

const Store: StoreType = {
  user: null,
  products: [],
  async init() {
    try {
      const products = getLocalStorage({
        defaultValue: [],
        storageKey: "products",
        staleTimeInMinutes: 5,
      });
      this.products = products;

      const authUser = auth.currentUser;
      console.log("AUTH USER", authUser);

      if (!authUser) {
        console.log("NO AUTH USER, SETTING AS NULL");
        this.user = null;
        return;
      }

      console.log("AUTH USER FOUND, SETTING AS USER", authUser);
      this.user = await UserController.getUserById(authUser.uid);
    } catch (error) {
      throw new Error(`Error initializing store: ${error}`);
    }
  },
};

window.app = window.app || {};
window.app.store = Store;

export { Store };
