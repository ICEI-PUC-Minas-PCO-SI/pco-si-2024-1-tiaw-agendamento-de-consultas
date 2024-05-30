createLocalData()
let data = JSON.parse(localStorage.getItem("user_files"))
let quantResquestFiles = data.files.filter((file) => file.file_type == "pedido").length
let quantPatientFiles = data.files.length - quantResquestFiles
document.getElementById("count-request-data").innerText = quantResquestFiles
document.getElementById("count-patient-data").innerText = quantPatientFiles

function finalize(){
    alert("consulta finalizada!")
}

function dadosPaciente() {
    let data = JSON.parse(localStorage.getItem("user_files"))
    if(isDataValid(data, "paciente")){
        data.files.filter((file) => file.file_type == "paciente").forEach(file => {
            download(file.url, "patient")
        });
    }
}

function dadosPedido() {
    let data = JSON.parse(localStorage.getItem("user_files"))
    if(isDataValid(data, "pedido")){
        data.files.filter((file) => file.file_type == "pedido").forEach(file => {
            download(file.url, "request")
        });
    }
}

function isDataValid(data, fileType){
    if(data == null || data == undefined){
        alert("falha ao recuperar dados da consulta!")
        return false
    }
    if(data.files == null || data.files == undefined || data.files.length == 0){
        alert(`consulta sem documentos de ${fileType} anexado!`)
        return false
    }
    return true
}

function download(url, file_type) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Problema de conexão");
            }
            return response.blob();
        })
        .then((file) => {
            const ex = getFileExtention(url);
            let tempUrl = URL.createObjectURL(file);
            const tempAElement = document.createElement("a");
            tempAElement.href = tempUrl;
            tempAElement.download = `downloaded_${file_type}-file.${ex}`;
            document.body.appendChild(tempAElement);
            tempAElement.click();
            URL.revokeObjectURL(tempUrl);
            tempAElement.remove();
        })
}

function getFileExtention(url) {
    const match = url.match(/\.[0-9a-z]+$/i);
    console.log(match[0])
    return match ? match[0].slice(1) : "";
}

function createLocalData(){
    let data = {}
    data.user_id = "uuid"
    data.id_consulta = "uuid"
    data.date_time = "2024-05-20T00:10:44.301Z"
    let files = []
    let file1 = {}
    file1.file_id = "uuid"
    file1.file_type = "paciente"
    file1.url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_0.jpg"
    files.push(file1)
    let file2 ={}
    file2.file_id = "uuid"
    file2.file_type = "pedido"
    file2.url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_1.jpg"
    files.push(file2)
    let file3 = {}
    file3.file_id = "uuid"
    file3.file_type = "pedido"
    file3.url = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_4.jpg"
    files.push(file3)
    data.files = files
    localStorage.setItem("user_files", JSON.stringify(data))
}