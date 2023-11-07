import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/config/firebase";

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
