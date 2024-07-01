import { firestore } from "./src/config/firebase.js";

export class Rating {

    constructor() { }


    registerNewRate = async (rate) => {
        try {
            //pegar user
            const id = 1200;
            const idDaConsulta = 12; //
            const result = await firestore.collection("rating").doc(idDaConsulta).set({
                rate: rate,
            });
            if(result != null){
                throw "Erro ao salvar";
            }
            return;
        } catch (e) {
            console.error("Error writing document: ", error);
        }
    }


}