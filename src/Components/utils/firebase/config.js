import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC6e3vkJtHjiz0EFYeV6CMWJ03TG13cuIA",
  authDomain: "agregar-img-archivos.firebaseapp.com",
  projectId: "agregar-img-archivos",
  storageBucket: "agregar-img-archivos.appspot.com",
  messagingSenderId: "324292723174",
  appId: "1:324292723174:web:38909cfa858bd9edcd5627"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(files, muchas) {
  const urls = [];

  // Si files no es un arreglo, conviértelo en un arreglo con un solo elemento
  if (!Array.isArray(files)) {
    files = [files];
  }

  for (const file of files) {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }

  return urls;
}