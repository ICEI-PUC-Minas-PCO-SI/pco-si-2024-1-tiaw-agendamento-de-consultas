var selectEspecialidades = document.getElementById("especialidade");
var selectClinicaHospital = document.getElementById("clinica");
var selectProfissional = document.getElementById("profissional");

var tipoConsulta;
var radioInputConvenio = document.getElementById("convenio");
var radioInputParticular = document.getElementById("particular");
var buttonAvancar = document.getElementById("avancar");

// Dados recebidos da base de dados, por enquanto estão dados estáticos PARA TESTE
var especialidades = ["Cardiologia", "Fisioterapia", "Oftamologia", "Otorrinolaringologia", "Pneumologia", "Urologia", "Ortodontia"];
var clinicaHospital = ["Hospital Centro Vida", "Centro Médico Gentil", "Hospital Alberto Ferraz"];

// Local Storage setado
var localDB = localStorage;

localDB.removeItem("tipoConsultaSelecionada");
localDB.removeItem("especialidadeSelecionada");
localDB.removeItem("hospitalSelecionado");
localDB.removeItem("profissionalSelecionado");

// Pegando do arquivo .json os dados necessários (hospitais, profissionais que trabalham neles e suas especialidades)
fetch("./listaHospitais.json").then(res => {
    if(!res.ok) {
        throw new Error
            (`Erro! Status: ${res.status}`);
    }
    return res.json();
}).then(dados => {
    localDB.setItem("hospitais", JSON.stringify(dados));
}).catch(erro => {
    console.error(`Erro ao puxar dados do arquivo json: ${erro}`);
});


// Armazenando no local storage as especialidades e hospitais disponíveis
localDB.setItem("especialidades", especialidades);

var hospitais = JSON.parse(localDB.getItem("hospitais"));

var especialidadeSelecionada = document.getElementById("especialidade").value;
var clinicaHospitalSelecionado = document.getElementById("clinica").value;
var profissionalSelecionado = document.getElementById("profissional").value;

// Insere as opções (argumento array) dentro do select (argumento element)
function inserirOpcoes(element, array) {  
    // Adicionando opções disponíveis
    for(let i = 0; i < array.length; i++) {
        optionElement = document.createElement('option');
        optionElement.value = array[i].toLowerCase();
        optionElement.innerText = array[i];
        element.appendChild(optionElement);
    }
}

function limparOpcoes(element) {
    let optionElement = document.createElement('option');
    optionElement.value = "nenhuma";
    optionElement.innerText = "Nenhuma selecionada";
    optionElement.disabled = true;
    optionElement.selected = true;
    element.innerText = "";
    element.appendChild(optionElement);
}

inserirOpcoes(selectEspecialidades, especialidades);

radioInputConvenio.addEventListener('change', event => {
    if(event.target.checked) {
        tipoConsulta = event.target.id;
        localDB.setItem("tipoConsultaSelecionada", event.target.id);
        limparOpcoes(selectEspecialidades);
        limparOpcoes(selectClinicaHospital);
        limparOpcoes(selectProfissional)
        inserirOpcoes(selectEspecialidades, especialidades);
        localDB.removeItem("especialidadeSelecionada");
        localDB.removeItem("hospitalSelecionado");
        localDB.removeItem("profissionalSelecionado");
    }
})

radioInputParticular.addEventListener('change', event => {
    if(event.target.checked) {
        tipoConsulta = event.target.id;
        localDB.setItem("tipoConsultaSelecionada", event.target.id);
        limparOpcoes(selectEspecialidades);
        limparOpcoes(selectClinicaHospital);
        limparOpcoes(selectProfissional)
        inserirOpcoes(selectEspecialidades, especialidades);
        localDB.removeItem("especialidadeSelecionada");
        localDB.removeItem("hospitalSelecionado");
        localDB.removeItem("profissionalSelecionado");
    }
})

// Event listeners para que somente as opções compatíveis sejam mostradas
selectEspecialidades.addEventListener('change', event => {
    let hospitaisDisponiveis = []
    let hospitais = JSON.parse(localDB.getItem("hospitais"));
    localDB.setItem("especialidadeSelecionada", event.target.value);
    for(let i = 0; i < hospitais.length; i++) {
        for(let j = 0; j < hospitais[i].profissionais.length; j++) {
            console.log(hospitais[i].profissionais[j].especialidades.length);
            for (let k = 0; k < hospitais[i].profissionais[j].especialidades.length; k++) {
                // k = hospitais[i].profissionais[j].especialidades.length;
                // j = hospitais[i].profissionais.length;
                if(hospitais[i].profissionais[j].especialidades[k].toLowerCase() == event.target.value.toLowerCase()) {
                    if(!hospitaisDisponiveis.includes(hospitais[i].nome)) {
                        hospitaisDisponiveis.push(hospitais[i].nome);
                    }
                }
            }

        }
    }
    limparOpcoes(selectClinicaHospital);
    limparOpcoes(selectProfissional)
    inserirOpcoes(selectClinicaHospital, hospitaisDisponiveis);
    localDB.removeItem("hospitalSelecionado");
    localDB.removeItem("profissionalSelecionado");
});

selectClinicaHospital.addEventListener('change', event => {
    let profissionaisDisponiveis = [];
    localDB.setItem("hospitalSelecionado", event.target.value);
    for(let i = 0; i < hospitais.length; i++) {
        if(hospitais[i].nome.toLowerCase() == selectClinicaHospital.value.toLowerCase()) {
            for(let j = 0; j < hospitais[i].profissionais.length; j++) {
                for(let l = 0; l < hospitais[i].profissionais[j].especialidades.length; l++) {
                    if(hospitais[i].profissionais[j].especialidades[l].toLowerCase() == selectEspecialidades.value.toLowerCase()) {
                        profissionaisDisponiveis.push(hospitais[i].profissionais[j].nome);
                    }
                }
            }
        }

            
    }
    limparOpcoes(selectProfissional);
    inserirOpcoes(selectProfissional, profissionaisDisponiveis);
    localDB.removeItem("profissionalSelecionado");
});

selectProfissional.addEventListener("change", event => {
    localDB.setItem("profissionalSelecionado", event.target.value);
});

buttonAvancar.addEventListener("click", event => {
    event.preventDefault();
    if(localDB.getItem("tipoConsultaSelecionada") && localDB.getItem("especialidadeSelecionada") && localDB.getItem("profissionalSelecionado") && localDB.getItem("hospitalSelecionado")) {
        console.log("Avançar!");
    }
    else {
        console.log("Preencha tudo antes de continuar.");
    }
});

