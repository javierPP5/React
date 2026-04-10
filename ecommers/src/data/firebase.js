// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  serverTimestamp,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBOaC9ZedwtuDDBX6yXLlr5iq-8_F9hnT0",
  authDomain: "plantas-8426b.firebaseapp.com",
  projectId: "plantas-8426b",
  storageBucket: "plantas-8426b.firebasestorage.app",
  messagingSenderId: "837018905013",
  appId: "1:837018905013:web:48860d6745d26a3eef11fc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();



googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const userData = await getUser(user.uid);
    return userData;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

export const getUser = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userDocRef;
};


export const signOutUser = async () => await signOut(auth);

// añadir a basedatos
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.id);
    batch.set(docRef, { ...object, createdAt: serverTimestamp() });
  });

  await batch.commit();
  console.log(`Documentos de ${collectionKey} añadidos ✅`);
};

export const getProducts = async () => {
  const collectionRef = collection(db, "plantas");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const products = querySnapshot.docs
    .map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    .sort((a, b) => (a.id > b.id ? 1 : -1));
    console.log(products)
  return products;
};



export const getProductsByCategory = async (filtro) => {
  const productsRef = collection(db, "plantas");
  const q = query(productsRef, where("filtro", "==", filtro));
  const querySnapshot = await getDocs(q);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};

export const getProductById = async (id) => {
  const docRef = doc(db, "plantas", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
  return null;
};

export const updateProduct = async (id, data) => {
  const docRef = doc(db, "plantas", id);
  await updateDoc(docRef, data);
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, "plantas", id);
  await deleteDoc(docRef);
};

export const addProduct = async (product) => {
  const docRef = doc(db, "plantas", product.id.toString());
  await setDoc(docRef, { ...product, createdAt: serverTimestamp() });
};


//carrito
export const saveCartToFirestore = async (uid, cart) => {
  if (!uid) return;

  const userCartRef = doc(db, "users", uid, "data", "cart");

  await setDoc(userCartRef, {
    cart, updatedAt: serverTimestamp(),
  });
};

export const getCartFromFirestore = async (uid) => {
  if (!uid) return [];

  const userCart = doc(db, "users", uid, "data", "cart");
  const info = await getDoc(userCart);

  if (info.exists()) {
    return info.data().cart || [];
  }

  return [];
};
