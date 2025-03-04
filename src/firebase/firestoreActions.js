import { collection, addDoc, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';

import { db } from '.';

export async function addToFirestore({ work }) {
  try {
    const docRef = await addDoc(collection(db, 'work'), work);

    return docRef.id;
  } catch(err) {
    throw new Error(`Error attemping to add doc: ${ err }`);
  }
}

export async function updateWork({ id, data }) {
  try {
    const docRef = doc(db, 'work', id);

    updateDoc(docRef, data);
  } catch(err) {
    throw new Error(`Error attemping to update doc: ${ err }`);
  }
}

export async function getWorks() {
  try {
    const querySnapshot = await getDocs(collection(db, 'work'));

    const works = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return works;
  } catch (err) {
    throw new Error(`Error attemping to get works: ${ err }`);
  }
}

export async function getWork({ id }) {
  try {
    const docRef = doc(db, 'work', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('El documento no existe.');
    }

    const work = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return work;
  } catch (err) {
    throw new Error(`Error attemping to get work: ${ err }`);
  }
}
