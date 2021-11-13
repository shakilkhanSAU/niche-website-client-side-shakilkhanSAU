import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);


    // signin with google 
    const signInWithGoogle = () => {
        setIsLoading(true)
        return signInWithPopup(auth, provider)
    }

    // sign out
    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            }).finally(() => {
                setIsLoading(false)
            });
    }

    // user state observer
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        })
        return unsubscribed;
    }, [auth]);



    return {
        user,
        setUser,
        isLoading,
        setIsLoading,
        signInWithGoogle,
        logOut,
    }

}



export default useFirebase;