// Local Storage
var pacientes = [];

var db = firebase.firestore()
var consultas = []
const urlParams = new URLSearchParams(window.location.search);
var date = new Date(urlParams.get('date'));
var loggedUser = JSON.parse(localStorage.getItem("@AGENDAI.USER"))
var consultaId = ''

await db.collection("consultas").where("profissional", "==", loggedUser.user.uid).where('finalized', '==', false).get().then(response => {
    response.forEach(element => {
        let data = element.data()
        if (data.date) {
            let consulta = {
                ...data,
                id: element.id
            }
            consultas.push(consulta)
        }
    })
})

var pacientesAux = []

await db.collection("user_data").get().then(response => {
    response.forEach(element => {
        let elementData = element.data()
        if (!elementData.admin) {
            let paciente = {
                ...element.data(),
                id: element.id
            }
            pacientesAux.push(paciente)
        }
    })
})

for (let index in consultas) {
    let consulta = consultas[index]
    var aux = {}
    aux.consultaId = consulta.id
    aux.hora = consulta.date.toDate().getHours() + ":" + (consulta.date.toDate().getMinutes() == 0 ? "00" : consulta.date.toDate().getMinutes())
    for (let indexj in pacientesAux) {
        let paciente = pacientesAux[indexj]
        if (paciente.id == consulta.user) {
            aux.nome = paciente.first_name + " " + paciente.last_name
            break
        }
    }
    pacientes.push(aux)
}


const campo = document.getElementById('cardBody');

campo.innerHTML +=  // Criando Div's
    `
    <div id="campoDeHorarios" class="row border-0">
            
    </div>
    `;

for (let i = 0; i < pacientes.length; i++) {

    let campoHorarios = document.querySelector("#campoDeHorarios");

    let divH = document.createElement("div");
    divH.setAttribute("id", "horarios" + i);
    divH.setAttribute("class", "hour col-3 d-flex my-2 justify-content-center fw-bold");

    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "hora")
    input.setAttribute("id", "hour" + i);

    let label = document.createElement("label");
    label.setAttribute("id", "hourL" + i);
    label.setAttribute("for", "hora");
    label.textContent = `${pacientes[i].hora}`;

    let divU = document.createElement("div");
    divU.setAttribute("id", "userName" + i);
    divU.setAttribute("class", "col-9 d-flex my-2 justify-content-start");

    let btn = document.createElement("button");
    btn.setAttribute("class", "btnUser");
    btn.setAttribute("id", "btnUser" + i);
    btn.textContent = `${pacientes[i].nome}`;


    divH.insertAdjacentElement("beforeend", input);
    divH.insertAdjacentElement("beforeend", label);
    divU.insertAdjacentElement("beforeend", btn)
    campoHorarios.insertAdjacentElement("beforeend", divH);
    campoHorarios.insertAdjacentElement("beforeend", divU);

    divH.addEventListener('click', () => {
        if (input) {
            input.checked = true;
            consultaId = pacientes[i].consultaId
        }
    });

    label.addEventListener('click', () => {
        if (input) {
            input.checked = true;
            consultaId = pacientes[i].consultaId
        }
    });

    btn.addEventListener('click', () => {
        if (input !== "checked") {
            input.checked = true;
            consultaId = pacientes[i].consultaId
        }

    });
};


// Iniciar consulta

const btnIniciar = document.getElementById('btnIniciar');
btnIniciar.addEventListener('click', () => {
    let inputRadio = document.querySelector('input[name="hora"]:checked');

    if (inputRadio) {
        window.location.replace(`./../../visualizar_documentos/index.html?consulta=${consultaId}`);
    } else {
        alert("Nenhum paciente selecionado! Selecione para prosseguirmos.");
        return;
    }


});