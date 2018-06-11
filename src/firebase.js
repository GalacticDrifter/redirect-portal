import * as firebase from 'firebase'

const auth = firebase.onAuthStateChanged(user => {
  if (user) {
    this.$store.dispatch('autoSignIn', user)
  }
})

const storage = firebase.storage()
const db = firebase.database()
const firestore = firebase.firestore()

export {
  db,
  firestore,
  storage
}
