import {firestore} from "/codigo/src/config/firebase.js";
import {UserModel, AddressModel } from "/codigo/src/core/model/user_model.js";

export class Register {
    constructor(){}
    registerNewUser(credential, firstName, lastName, phone, email, document, addres, number, complement, city, state, parentName, parentDocument  ){
        const address = new AddressModel();
        const user = new UserModel();   
    }


}