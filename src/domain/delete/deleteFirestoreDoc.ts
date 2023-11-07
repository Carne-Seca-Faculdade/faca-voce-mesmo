import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/config/firebase";

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
