// import {Rating} from '/codigo/src/core/rating.js'

const btn = document.querySelector("button", "#finalizar");
const avaliation = document.querySelector('#avaliacao');
const stars = document.querySelector("stars-rating");
const question = document.querySelector('#pergunta');
const voting = document.querySelector('#votacao');
const thanks = document.querySelector('#thanks');

//Função responsável por caputurar o valor da estrela votada:
function starvalue() {
    const value = document.getElementsByName('star');

    for (var i = 0; i < value.length; i++) {
        if(value[i].checked) {
            console.log(value[i].value)
        }
    }
}

btn.onclick =  () => {

    avaliation.style.display = 'none' // Torna o card das avaliações invisível
    thanks.style.display = 'block'; // Mostra o card de agradescimento por usar a plataforma




    setTimeout (() => {
        location.reload();
    }, 2000) // Aqui será feita uma realocação para a página inicial da aplicação após alguns segundos
};

// Após clicar no botão será feito um link com o firebase para armazenar os dados da avaliação.