import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, updateProfile, signOut, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();


    const registerNewUser = (name, email, password, history) => {
        setIsLoading(true);
        setOpen(false)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const newUser = { displayName: name, email };
                setUser(newUser)
                setOpen(true)
                const destination = '/'
                history.push(destination)
                setError('');
                // save user to data base 
                saveUser(email, name, 'POST')

                // update on firebase
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                }).catch((error) => {
                })
                // history push
                // history.replace('/')
            })
            .catch(error => {
                setError(error.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // login user 
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user)
                setOpen(true)
                // redirect user 
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setError('')
            })
            .catch((error) => {
                setError(error.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // google signin
    const googleSignin = () => {
        setIsLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                const loginUser = result.user;
                setUser(loginUser)
                setError('')
                saveUser(loginUser.email, loginUser.displayName, 'PUT')
            }).catch((error) => {
                setError(error.message)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    // sign out user
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setError('')
        }).catch((error) => {
            setError(error.message)
        }).finally(() => {
            setIsLoading(false)
            setOpen(false)
        })
    }

    // user observer or manageUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                    .then(idToken => {
                        // setToken(idToken)
                    })
            } else {
                setUser({})
                setOpen(false)
            }
            setIsLoading(false)

        });
        return () => unsubscribe;
    }, [auth]);

    // check admin or not
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    // save user
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        // console.log(user)
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // data
                console.log(data)
            })
    }


    return {
        registerNewUser,
        user,
        error,
        loginUser,
        googleSignin,
        logOut,
        isLoading,
        open,
        setOpen,
        admin
    }
}
export default useFirebase;