class SignInController {
    constructor() {
        this._firebaseConfig = {
            apiKey: "AIzaSyC950Slq6RoGWoXUA4WU6O4iuQdzX_k-qQ",
            authDomain: "agendai-84d84.firebaseapp.com",
            projectId: "agendai-84d84",
            storageBucket: "agendai-84d84.appspot.com",
            messagingSenderId: "346989741208",
            appId: "1:346989741208:web:4838f4fc5cc1d1a36abced",
            measurementId: "G-RET5W0Q8SL"
        };
    }
    /**
     * Atualiza os dados do usuário
     * @param {id} id 
     * @param {data} data 
     */
    updateUserData = async ({ id, firstName, lastName, phone, address, number, complement, city, state, parentDocument, parentName } = {}) => {
        try {
            if (firebase.apps.length == 0) {
                await firebase.initializeApp(this._firebaseConfig);
            }
            const ref = await firebase.firestore().collection("user_data").doc(id).update({
                "first_name": firstName,
                "last_name": lastName,
                "phone": phone,
                "full_address": `${address}, ${number}${complement ? `,${complement}` : ""},${city},${state}`,
                "parent_name": parentName,
                "parent_document": parentDocument,
            });
            return true
        } catch (error) {
            return false;
            console.log(error);
        }
    }
    signUp = async ({ email, password, firstName, lastName, phone, document, addres, number, complement, city, state, parentName, parentDocument } = {}) => {
        try {
            if (firebase.apps.length == 0) {
                await firebase.initializeApp(this._firebaseConfig);
            }
            const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const ref = await firebase.firestore().collection("user_data").doc(credential.user.uid).set({
                "id": credential.user.uid,
                "email": email,
                "first_name": firstName,
                "last_name": lastName,
                "phone": phone,
                "document": document,
                "full_address": `${addres}, ${number}${complement ? `,${complement}` : ""},${city},${state}`,
                "parent_name": parentName,
                "parent_document": parentDocument,
            });
            return true;
        } catch (error) {
            return false;
            console.log(error);
        }
    }

    async getUser(id) {
        try {
            if (firebase.apps.length == 0) {
                await firebase.initializeApp(this._firebaseConfig);
            }
            const user = await firebase.firestore().collection('user_data').doc(id).get()
            if (user.exists) {
                return user;
            } else {
                return null;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
