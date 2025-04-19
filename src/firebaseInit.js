// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import data from "./pages/data.json";
import { getAuth } from "firebase/auth";
console.log(data);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARpUuCl3SRuWW-W5_UbUhQTE9DRYf8JnE",
    authDomain: "buy-busy-6bd8a.firebaseapp.com",
    projectId: "buy-busy-6bd8a",
    storageBucket: "buy-busy-6bd8a.firebasestorage.app",
    messagingSenderId: "677725396448",
    appId: "1:677725396448:web:ababfa10dd4cffea13df85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const uploadProducts = async () => {
//     const productCollectionRef = collection(db, "products");

//     try {
//         for (let item of data) {
//             await addDoc(productCollectionRef, item);
//         }
//         console.log("All products uploaded successfully!");
//     } catch (error) {
//         console.error("Error uploading products: ", error);
//     }
// };
// function UploadComponent() {
//     useEffect(() => {
//         console.log("----------------")
//         uploadProducts(); // call only once
//     }, []);

//     return null;
// }
// export { UploadComponent };
export const auth = getAuth(app);
// Initialize Firebase
export default db;