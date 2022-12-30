import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/Firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithPopup } from 'firebase/auth'


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleProviderSignIn = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }
    const LogOut = () => {
        setLoading(true)
        localStorage.removeItem('accessToken')
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user is observing')
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleProviderSignIn,
        updateUser,
        LogOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;