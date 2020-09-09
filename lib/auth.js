import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import { createUser } from './db'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
  const [user, setUser] = useState(null)

  const handleUser = (rawUser) => {
    if (!rawUser) {
      setUser(false)
      return false
    }

    const formattedUser = formatUser(rawUser)

    createUser(formattedUser.uid, formattedUser)
    setUser(formattedUser)
    return formattedUser
  }

  const signInWithGitHub = async () => {
    const resp = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
    handleUser(resp.user)
  }

  const signOut = async () => {
    await firebase.auth().signOut()
    handleUser(false)
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    signInWithGitHub,
    signOut,
  }
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0]?.providerId,
    photoUrl: user.photoURL,
  }
}
