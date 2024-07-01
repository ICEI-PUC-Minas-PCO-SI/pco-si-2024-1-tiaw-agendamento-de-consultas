// import {Rating} from '/src/core/rating.js'

const btn = document.querySelector("button", "#finalizar");
const avaliation = document.querySelector('#avaliacao');
const stars = document.querySelector("stars-rating");
const question = document.querySelector('#pergunta');
const voting = document.querySelector('#votacao');
const thanks = document.querySelector('#thanks');

var rate = 0;

//Função responsável por caputurar o valor da estrela votada:
function starvalue(value) {
    rate = value;
}

btn.onclick = async () => {

    avaliation.style.display = 'none' // Torna o card das avaliações invisível
    thanks.style.display = 'block'; // Mostra o card de agradescimento por usar a plataforma

    const consulta = localStorage.getItem("@AGENDAI.CONSULTA");
    console.log(consulta)
    if (consulta) {
        let _firebaseConfig = {
            apiKey: "AIzaSyC950Slq6RoGWoXUA4WU6O4iuQdzX_k-qQ",
            authDomain: "agendai-84d84.firebaseapp.com",
            databaseURL: "https://agendai-84d84-default-rtdb.firebaseio.com",
            projectId: "agendai-84d84",
            storageBucket: "agendai-84d84.appspot.com",
            messagingSenderId: "346989741208",
            appId: "1:346989741208:web:4838f4fc5cc1d1a36abced",
            measurementId: "G-RET5W0Q8SL"
        };
        if (firebase.apps.length <= 0) {
            const result = await firebase.initializeApp(_firebaseConfig);
            console.log(result)
        }
        const doc = await firebase.firestore().collection('consultas').doc(consulta).update({
            'rate': rate,
        });
        localStorage.clear();
    }

    setTimeout(() => {
        location.replace('/codigo')
    }, 2000) // Aqui será feita uma realocação para a página inicial da aplicação após alguns segundos
};
// Após clicar no botão será feito um link com o firebase para armazenar os dados da avaliação.