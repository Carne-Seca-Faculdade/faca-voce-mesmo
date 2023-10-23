import { ProductType } from "./ProductType";
import { UserType } from "./UserType";

export interface StoreType {
  products: ProductType[];
  user: UserType | null;
  init(): Promise<void> | void;
}
