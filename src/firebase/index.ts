// import firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './config'

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
