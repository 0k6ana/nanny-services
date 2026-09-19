import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

import { auth } from './config'

export const registerUser = async (name, email, password) => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  await updateProfile(result.user, {
    displayName: name,
  })

  return result
}

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = () => {
  return signOut(auth)
}

