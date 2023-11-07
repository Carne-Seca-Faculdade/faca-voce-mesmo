import { deleteFirestoreDoc } from "../domain/delete/deleteFirestoreDoc";
import { readFirestoreDoc } from "../domain/read/readFirestoreDoc";
import { updateFirestoreDoc } from "../domain/write/updateFirestoreDoc";

export interface UserType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ownProducts: string[];
}

export class User implements UserType {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ownProducts: string[];

  constructor(userData: UserType) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.phone = userData.phone;
    this.address = userData.address;
    this.ownProducts = userData.ownProducts;
  }

  static async fetchData(userId: string) {
    try {
      const userDoc = await readFirestoreDoc({
        collectionPath: "users",
        documentPath: userId,
      });

      if (!userDoc.exists()) {
        throw new Error("User not found");
      }

      const userData = userDoc.data() as UserType;
      return {
        ...userData,
        id: userDoc.id,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching user data");
    }
  }

  static async updateData(userId: string, newUserData: Partial<UserType>) {
    try {
      await updateFirestoreDoc({
        collectionPath: "users",
        documentPath: userId,
        newData: newUserData,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error updating user data");
    }
  }

  static async deleteData(userId: string, userProducts: string[]) {
    try {
      const promises = [];
      promises.push(
        deleteFirestoreDoc({
          collectionPath: "users",
          documentPath: userId,
        }),
      );

      userProducts.forEach((productId) => {
        promises.push(
          deleteFirestoreDoc({
            collectionPath: "products",
            documentPath: productId,
          }),
        );
      });

      await Promise.all(promises);
    } catch (error) {
      console.error(error);
      throw new Error("Error deleting user data and products");
    }
  }
}
