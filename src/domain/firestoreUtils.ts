import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/config/firebase";

interface ReadFirestoreDocParams {
  collectionPath: string;
  documentPath: string;
}

export async function readFirestoreDoc({
  collectionPath,
  documentPath,
}: ReadFirestoreDocParams) {
  const collectionRef = collection(db, collectionPath);
  const documentRef = doc(collectionRef, documentPath);
  const documentSnap = await getDoc(documentRef);
  return documentSnap;
}

interface CreateFirestoreDocParams<T extends Record<string, any>> {
  collectionPath: string;
  data: T;
}

export async function createFirestoreDoc<T extends Record<string, any>>({
  collectionPath,
  data,
}: CreateFirestoreDocParams<T>) {
  const collectionRef = collection(db, collectionPath);
  const createdDoc = await addDoc(collectionRef, data);
  return createdDoc;
}

interface DeleteFirestoreDocParams {
  collectionPath: string;
  documentPath: string;
}

export async function deleteFirestoreDoc({
  collectionPath,
  documentPath,
}: DeleteFirestoreDocParams) {
  const collectionRef = collection(db, collectionPath);
  const documentRef = doc(collectionRef, documentPath);
  await deleteDoc(documentRef);
}

interface UpdateFirestoreDocParams {
  collectionPath: string;
  documentPath: string;
  newData: any;
}

export async function updateFirestoreDoc({
  collectionPath,
  documentPath,
  newData,
}: UpdateFirestoreDocParams) {
  const collectionRef = collection(db, collectionPath);
  const documentRef = doc(collectionRef, documentPath);
  await updateDoc(documentRef, newData);
}
