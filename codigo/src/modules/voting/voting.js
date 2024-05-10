const btn = document.querySelector("button", "#finalizar");
const avaliation = document.querySelector('#avaliacao');
const stars = document.querySelector("stars-rating");
const question = document.querySelector('#pergunta');
const voting = document.querySelector('#votacao');
const thanks = document.querySelector('#thanks'); 

btn.onclick =  () => {
    question.style.display = 'none';
    voting.style.display = 'none';
    btn.style.display = 'none';
    avaliation.style.display = 'none'
    thanks.style.display = 'block';

    setTimeout (() => {
        location.reload(); // Aqui o programa retornaria à página inicial após alguns segundos
    }, 2000)
};

