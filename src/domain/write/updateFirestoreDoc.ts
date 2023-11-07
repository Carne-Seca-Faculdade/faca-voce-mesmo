import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";

interface UpdateFirestoreDocParams<T extends Record<string, any>> {
  collectionPath: string;
  documentPath: string;
  newData: T;
}

export async function updateFirestoreDoc<T extends Record<string, any>>({
  collectionPath,
  documentPath,
  newData,
}: UpdateFirestoreDocParams<T>) {
  const collectionRef = collection(db, collectionPath);
  const documentRef = doc(collectionRef, documentPath);
  await updateDoc(documentRef, newData);
}
