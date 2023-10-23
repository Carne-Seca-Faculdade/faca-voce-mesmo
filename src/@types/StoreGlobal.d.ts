/// <reference types="./StoreType" />

declare global {
  interface Window {
    app: {
      store: StoreType;
    };
  }
}
