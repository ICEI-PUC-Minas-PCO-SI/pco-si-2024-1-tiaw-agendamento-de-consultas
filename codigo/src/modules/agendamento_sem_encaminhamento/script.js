var selectEspecialidades = document.getElementById("especialidade");
var selectClinicaHospital = document.getElementById("clinica");
var selectProfissional = document.getElementById("profissional");

selectClinicaHospital.setAttribute("disabled", true)
selectProfissional.setAttribute("disabled", true)

var tipoConsulta = '';
var radioInputConvenio = document.getElementById("convenio");
var radioInputParticular = document.getElementById("particular");
var buttonAvancar = document.getElementById("avancar");
var especialitieFilter = ''
var hospitalFilter = ''
var hasEspecialitie = false

var userList = []
var professionalIdByName = {}
var db = firebase.firestore()
await db.collection("user_data").where("admin", "==", true).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let user = {
            ...doc.data(),
            id: doc.id
        }
        let userName = user.first_name.toLowerCase()+" "+user.last_name.toLowerCase()
        userList.push(user)
        if(!professionalIdByName[userName]){
            professionalIdByName[userName] = user.id
        }
    });
});
var userNameList = userList.map((user)=>{return user.first_name+" "+user.last_name})
var hospitalList = userList.map((user)=>user.hospital)
hospitalList = [...new Set(hospitalList)];
var especialities = userList.map((user)=>user.especialidade)
especialities = [...new Set(especialities)]

inserirOpcoes(selectEspecialidades, especialities)
inserirOpcoes(selectClinicaHospital, hospitalList)
inserirOpcoes(selectProfissional, userNameList)

selectEspecialidades.addEventListener('change', event => {
    especialitieFilter = event.target.value
    userNameList = userList.filter((user)=>
        user.especialidade == especialitieFilter && (hospitalFilter != '' ? user.hospital == hospitalFilter : true)
    ).map((user)=>user.first_name+" "+user.last_name)
    hospitalList = userList.filter((user)=> user.especialidade == especialitieFilter).map((user)=>user.hospital)
    hospitalList = [...new Set(hospitalList)];
    inserirOpcoes(selectProfissional, userNameList)
    inserirOpcoes(selectClinicaHospital, hospitalList)
    selectClinicaHospital.removeAttribute("disabled")
    selectProfissional.setAttribute("disabled", true)
});

selectClinicaHospital.addEventListener('change', event =>{
    hospitalFilter = event.target.value.toLowerCase()
    userNameList = userList.filter((user)=>
        user.hospital.toLowerCase() == hospitalFilter && (especialitieFilter != '' ? user.especialidade == especialitieFilter : true)
    ).map((user)=>user.first_name+" "+user.last_name)
    inserirOpcoes(selectProfissional, userNameList)
    selectProfissional.removeAttribute("disabled")
})

radioInputConvenio.addEventListener('change', event => {
    if(event.target.checked) {
        tipoConsulta = event.target.id;
    }
})

radioInputParticular.addEventListener('change', event => {
    if(event.target.checked) {
        tipoConsulta = event.target.id;
    }
})

buttonAvancar.addEventListener("click", event => {
    event.preventDefault();
    let erroMessage = '';
    if(tipoConsulta == ''){
        erroMessage += erroMessage == '' ? "Preencha o tipo de consulta" : ", tipo de consulta"
    }
    if(selectEspecialidades.value == ''){
        erroMessage += erroMessage == '' ? "Preencha a especialidade" : ", especialidade"
    }
    if(selectClinicaHospital.value == ''){
        erroMessage += erroMessage == '' ? "Preencha a clinica/hospital" : ", clinica/hospital"
    }
    if(selectEspecialidades.value != '' && selectClinicaHospital.value != '' && tipoConsulta != '') {
        let consult = localStorage.getItem("@AGENDAI.CONSULTA")
        console.log(professionalIdByName)
        console.log(selectProfissional.value)
        db.collection("consultas").doc(consult).update({
            tipo: tipoConsulta,
            especialidade: selectEspecialidades.value,
            local: selectClinicaHospital.value,
            profissional: professionalIdByName[selectProfissional.value],
            step: "AGENDAR CONSULTA"
        }).then(()=>{
            window.location.replace('/codigo/src/modules/envio_documentos')
        }).catch((error) => {
            console.error("Error updating document: ", error);
            alert("Erro, favor tentar novamente!")
        });
    }
    else {
        alert(erroMessage + " antes de continuar.");
    }
});

// Insere as opções dentro do select
function inserirOpcoes(element, array) {
    limparOpcoes(element)
    for(let i = 0; i < array.length; i++) {
        let optionElement = document.createElement('option');
        optionElement.value = array[i].toLowerCase();
        optionElement.innerText = array[i];
        element.appendChild(optionElement);
    }
}

function limparOpcoes(element) {
    let optionElement = document.createElement('option');
    optionElement.value = '';
    optionElement.innerText = "Nenhuma selecionada";
    optionElement.disabled = true;
    optionElement.selected = true;
    element.innerText = "";
    element.appendChild(optionElement);
}