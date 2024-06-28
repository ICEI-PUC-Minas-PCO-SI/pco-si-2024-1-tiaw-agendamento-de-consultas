// Local Storage
const pacientes = [
    {
            nome: "Kayque dos Santos",
            hora: "08:00",
            data: ""
    }, 
    {
            nome: "Maria Fernanda",
            hora: "09:00",
            data: ""
    }, 
    {
            nome: "Carlos Augusto",
            hora: "10:00",
            data: ""
    },
    {
            nome: "Antonio Augusto",
            hora: "14:30",
            data: ""
    },
    {
            nome: "Carlos Magno",
            hora: "15:30",
            data: ""
    },
    {
            nome: "João Alberto",
            hora: "16:00",
            data: ""
    },
    {
            nome: "Pedro Fonseca",
            hora: "17:00",
            data: ""
    }, 
    {
            nome: "Pericles da Silva",
            hora: "22:00",
            data: ""
    }
];

localStorage.setItem("pacientes", JSON.stringify(pacientes));

// Criando div com nome e horario do paciente



window.addEventListener('load', function () {
    const campo = document.getElementById('cardBody');

    campo.innerHTML +=  // Criando Div's
        `
        <div id="campoDeHorarios" class="row border-0">
                
        </div>
        `;
    
    for(let i = 0; i < pacientes.length; i++) {
        
        
        const storage = JSON.parse(localStorage.getItem('pacientes')); // percorrendo os elementos do array
        

        let campoHorarios = document.querySelector("#campoDeHorarios");
        
        let divH = document.createElement("div");
        divH.setAttribute("id", "horarios" + i);
        divH.setAttribute("class", "hour col-4 my-2 d-flex justify-content-around");
        
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "hora")
        input.setAttribute("id", "hour"+i);
        input.setAttribute("class", "mt-1")

        let label = document.createElement("label");
        label.setAttribute("id", "hourL" + i);
        label.setAttribute("for", "hora");
        label.textContent = `${pacientes[i].hora}`;
        label.setAttribute("class", "m-0")

        let divU = document.createElement("div");
        divU.setAttribute("id", "userName" + i);
        divU.setAttribute("class", "col-8 d-flex my-2 justify-content-around");
        
        let btn = document.createElement("button");
        btn.setAttribute("class", "btnUser");
        btn.setAttribute("id", "btnUser" + i);
        btn.textContent = `${storage[i].nome}`;

        
        divH.insertAdjacentElement("beforeend", input);
        divH.insertAdjacentElement("beforeend", label);
        divU.insertAdjacentElement("beforeend", btn)
        campoHorarios.insertAdjacentElement("beforeend", divH);
        campoHorarios.insertAdjacentElement("beforeend", divU);

        label.addEventListener('click', () => {
            if(input) {
                input.checked = true;
            }
        });
        
        btn.addEventListener('click', () => {
            let button = document.querySelector("#btnUser" + i);

            if(input !== "checked") {
                input.checked = true;
            }
            
        });
    };    
});


// Iniciar consulta

const btnIniciar = document.getElementById('btnIniciar');
btnIniciar.addEventListener('click', () => {
    let inputRadio = document.querySelector('input[name="hora"]:checked');

    if(inputRadio) {
        window.location.replace("../index.html");
    } else {
        alert("Nenhum paciente selecionado! Selecione para prosseguirmos.");
        return;
    }
    
    
});