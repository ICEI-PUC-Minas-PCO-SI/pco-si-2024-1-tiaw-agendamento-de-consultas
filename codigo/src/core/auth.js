import { auth, firestore } from "/codigo/src/config/firebase.js"
export class Auth {

    constructor() {
      this.app = firebase;
      this.auth = auth;
      this.firestore = firestore;
    }
    login = async (email, password) => {
      try {
         return await auth.signInWithEmailAndPassword(email, password);
      } catch (e) {
        return null;
      }
    }
    signUp = async (email, password, firstName, lastName, phone, document) => {
      const credential = await auth.createUserWithEmailAndPassword(auth, email, password);
      console.log(credential);
    }
}
  