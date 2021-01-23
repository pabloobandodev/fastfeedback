import React, { useState, useEffect, useContext, createContext } from 'react'
import firebase from './firebase'
import cookie from 'js-cookie'
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
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)

      cookie.set('fast-feedback-auth', true, { expires: 1 })

      return user
    } else {
      setUser(false)
      cookie.remove('fast-feedback-auth')

      return false
    }
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
    token: user.xa,
    provider: user.providerData[0]?.providerId,
    photoUrl: user.photoURL,
  }
}
