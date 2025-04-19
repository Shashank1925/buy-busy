import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebaseInit";
import { useNavbarHook } from "../customProvider";
const CustomSignInContext = createContext();


export function useCustomSignInHook() {
    return useContext(CustomSignInContext);
}
export default function CustomSignInProvider({ children }) {
    // const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState([]);
    const { signIn, setSignIn } = useNavbarHook();
    const handleSignUp = async () => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            // await updateProfile(auth.currentUser, { displayName: name });
            // console.log(name);
            setUserData(newUser.user);
            setSignUp(!signUp);
            console.log('User signed up successfully!');
            console.log(userData);
            console.log(error)
        } catch (error) {
            setError(error.message);
        }
        toast.success("Sign Up successfully!");

    };
    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const existingUser = userCredential.user;
            // console.log(existingUser.uid, existingUser.displayName)
            if (existingUser) {
                setUserData(existingUser);
                setSignIn(!signIn);
                console.log(signIn);
                // console.log(`${existingUser.displayName} signed in successfully!`);
            }
        } catch (error) {
            setError(error.message);
        }
        toast.success("You are Signed in");

    };



    return (
        <CustomSignInContext.Provider value={{ signIn, setSignIn, handleSignIn, handleSignUp, setEmail, setPassword, email, password }}>
            {children}
        </CustomSignInContext.Provider>
    );
}