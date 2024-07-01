var divCalendario = document.getElementById("container-month");
var elementDias = document.getElementById("number-days").getElementsByTagName("label");
var elementMonth = document.getElementById("month").getElementsByTagName("input");
var yearMonth = elementMonth[0];
var divHorariosDisponiveis = document.createElement('div');
var buttonAvancar = document.getElementById("avancar");
var buttonsHorario;



divHorariosDisponiveis.id = "horariosDisponiveis";
divHorariosDisponiveis.classList.add("row");
divHorariosDisponiveis.classList.add("justify-content-center");
divCalendario.appendChild(divHorariosDisponiveis);

// Setando base de dados local
var localDB = localStorage;

localDB.removeItem("horarioSelecionado");

// Pegando do arquivo .json os dados necessários (dados do médico incluindo nome, especialidades e horários disponíveis) e armazenando-os no localStorage
fetch("./dadosMedico.json").then(res => {
    if(!res.ok) {
        throw new Error
            (`Erro! Status: ${res.status}`);
    }
    return res.json();
}).then(dados => {
    localDB.setItem("medico", JSON.stringify(dados));
}).catch(erro => {
    console.error(`Erro ao puxar dados do arquivo json: ${erro}`);
});

medico = JSON.parse(localDB.getItem("medico"));


// Setar classe de disponivel para os dias disponíveis

// Pegando todos os elementos de dia (usar para setar a classe depois)
for(let i = 0; i < elementDias.length; i++) {
    let dia = elementDias[i].innerText;
    // console.log(`Dia: ${dia}`);
    // console.log(elementDias[i]);
}

// Pegando o mês e ano e armazenando-o na variável yearMonth sempre que o elemento de mês e ano for atualizado
for (let i = 0; i < elementMonth.length; i++) {
    let element = elementMonth[i];
    element.addEventListener('change', event => {
        // console.log(event.target.value);
        yearMonth = event.target.value;
        resetarSelecao();
        resetarHorarios();
        exibirDatasDisponiveis();
    });
}

// Pegando todos os elementos de dia e adicionando um evento para o clique
for (let i = 0; i < elementDias.length; i++) {
    let element = elementDias[i];
    element.addEventListener('click', event => {
        resetarHorarios();
        localDB.setItem("dataSelecionada", `${yearMonth}-${event.target.innerText}`);
        localDB.removeItem("horarioSelecionado");
        exibirHorariosDisponiveis(event.target.innerText);
    });
}

// Printa, em formato de objeto Date, todas as datas + horários disponíveis
for(let i = 0; i < medico.diasDisponiveis.length; i++) {
    for(let j = 0; j < medico.diasDisponiveis[i].horarios.length; j++) {
        let horarioData = new Date(`${medico.diasDisponiveis[i].data}T${medico.diasDisponiveis[i].horarios[j]}`)
    }
}

function exibirDatasDisponiveis() {
    for(let i = 0; i < medico.diasDisponiveis.length; i++) {
        let data = new Date(`${medico.diasDisponiveis[i].data}T${medico.diasDisponiveis[i].horarios[0]}`);
        let month = data.getMonth();
        month = parseInt(month) + 1;
        if(month < 10) {
            month = `0${month}`;
        }
        if(`${data.getFullYear()}-${month}` == yearMonth) {
            elementDias[data.getDate()].style = "color: black";
        }
    }
}

function exibirHorariosDisponiveis(dia) {
    if(dia < 10) {
        dia = `0${dia}`;
    }
    

    for(let i = 0; i < medico.diasDisponiveis.length; i++) {
        if(`${yearMonth}-${dia}` == medico.diasDisponiveis[i].data) {
            for(let j = 0; j < medico.diasDisponiveis[i].horarios.length; j++) {
                // Criando elemento para exibir os horários disponíveis
                let horario = medico.diasDisponiveis[i].horarios[j];
                let button = document.createElement('button');
                button.innerText = horario;
                button.classList.add("btn");
                button.classList.add("btn-primary");
                button.classList.add("col-3");
                button.classList.add("m-2");
                divHorariosDisponiveis.appendChild(button);
                button.addEventListener('click', event => {
                    escolherHorario(event.target);
                });
            }
        }
    }

    buttonsHorario = divHorariosDisponiveis.getElementsByTagName('button');

    for(let i = 0; i < medico.diasDisponiveis.length; i ++) {

    }
}

// Função para lidar com o clique no botão de horário, adicionando ou removendo uma classe que muda a cor do botão. 
function escolherHorario(btn) {

    let alreadySelected = btn.classList.contains("btn-horario-selecionado");
    
    for(let i = 0; i < buttonsHorario.length; i++) {
        if(buttonsHorario[i].classList.contains("btn-horario-selecionado")) {
            buttonsHorario[i].classList.remove("btn-horario-selecionado");
        }
    }

    if(!alreadySelected) {
        btn.classList.add("btn-horario-selecionado");
        localDB.setItem("horarioSelecionado", btn.innerText);
    }
    else {
        localDB.removeItem("horarioSelecionado");
    }
}

// Reseta a seleção de datas e horários, fazendo todas estarem indisponíveis novamente (deixando cinza) para que possam passar pela verificação de disponibilidade.
function resetarSelecao() {
    for(let i = 0; i < elementDias.length; i++) {
        elementDias[i].style = "color: lightgray";
    }
    document.getElementById("horariosDisponiveis").innerHTML = "";
}

// Retira os horários da tela
function resetarHorarios() {
    divHorariosDisponiveis.innerHTML = "";
    buttonsHorario = [];
}

buttonAvancar.addEventListener("click", event => {
    if(localDB.getItem("horarioSelecionado")) {
        console.log("Avançou! Dia escolhido: " + localDB.getItem("dataSelecionada") + " Horário escolhido: " + localDB.getItem("horarioSelecionado"));
    }
    else {
        console.log("Escolha uma data e horário antes de avançar.");
    }
});