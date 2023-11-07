import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/config/firebase";

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
