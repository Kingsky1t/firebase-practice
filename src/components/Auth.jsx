import { useState } from "react";
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // console.log(auth?.currentUser?.email)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (err) {
            console.error(err)
        }

    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }

    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div>
                <input type="email" placeholder="Email..." onChange={e => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password..." onChange={e => { setPassword(e.target.value) }} />
                <button type="submit" onClick={signIn}>Sign In</button>
            </div>
            <div>
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            </div>
            <button onClick={logout}>Logout</button>
        </>
    )
}