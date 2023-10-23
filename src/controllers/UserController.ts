import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserType } from "../@types/UserType";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { parseFirebaseLoginError } from "../utils/parseFirebaseLoginError";
import { ProductType } from "../@types/ProductType";
import { auth, db } from "../services/config/firebase";
import { Store } from "../services/Store";
import { Router } from "../services/Router";

async function getUserById(userId: string): Promise<UserType | null> {
  try {
    const userDocRef = doc(db, `users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as UserType;
      return { ...userData, id: userId };
    } else {
      console.error("User not found");
      return null;
    }
  } catch (error) {
    console.error(`Error loading user: ${error}`);
    return null;
  }
}

async function loginUser(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserById(user.user.uid);
    Store.user = userData;
  } catch (error: any) {
    console.error(error);
    return parseFirebaseLoginError(error.code);
  }
}

async function logoutUser() {
  try {
    await auth.signOut();
    Store.user = null;
  } catch (error) {
    throw new Error(`Error logging out user: ${error}`);
  }
}

async function createUserDoc(user: User, name: string, email: string) {
  try {
    const userDocRef = doc(db, `users/${user.uid}`);
    const newUser: UserType = {
      id: user.uid,
      address: "",
      name,
      phone: "",
      email,
      ownProducts: [],
    };
    await setDoc(userDocRef, newUser);
    Store.user = newUser;
  } catch (error) {
    throw new Error(`Error creating user doc: ${error}`);
  }
}

async function signupUser(name: string, email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await createUserDoc(user.user, name, email);
  } catch (error: any) {
    console.error(error);
    return parseFirebaseLoginError(error.code);
  }
}

async function registerUser({
  name,
  email,
  phone,
  address,
  password,
}: {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    const userDocRef = doc(db, `users/${user.user.uid}`);
    const newUser: UserType = {
      address,
      name,
      phone,
      email,
      ownProducts: [],
    };
    await setDoc(userDocRef, newUser);
    Store.user = { ...newUser, id: user.user.uid };
    console.log("User registered successfully");
    Router.goToPath("/products");
  } catch (error) {
    throw new Error(`Error registering user: ${error}`);
  }
}

async function addProductToUser(product: ProductType) {
  if (!Store.user) {
    throw new Error("User not found");
  }

  try {
    const userDocRef = doc(db, `users/${Store.user.id}`);
    await updateDoc(userDocRef, {
      ownProducts: [...Store.user.ownProducts, product.id],
    });
  } catch (error) {
    throw new Error(`Error adding product to user: ${error}`);
  }
}

export const UserController = {
  getUserById,
  loginUser,
  logoutUser,
  signupUser,
  addProductToUser,
  registerUser,
};
