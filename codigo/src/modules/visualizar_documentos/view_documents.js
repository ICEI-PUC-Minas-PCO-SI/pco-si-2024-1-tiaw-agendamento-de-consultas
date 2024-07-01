// createLocalData()

const url = new URLSearchParams(window.location.search);
const id_consulta = url.get('consulta');


let refConsulta = await firebase.firestore().collection('consultas').doc(id_consulta).get()
if (!refConsulta.exists) {
    window.location.replace('/codigo/src/modules/horarios_admin')
}
const dataConsulta = await refConsulta.data();
const carteirinhaUrl = dataConsulta.carteirinha;
const pedidosUrl = dataConsulta.pedidos;

let quantResquestFiles = pedidosUrl.length;
let quantPatientFiles = carteirinhaUrl ? 1 : 0;
document.getElementById("count-request-data").innerText = quantResquestFiles
document.getElementById("count-patient-data").innerText = quantPatientFiles

$('#patient-data').on('click', () => {

    dadosPaciente()
})
$('#request-data').on('click', () => {
    dadosPedido()
})

$('#finalize').on('click', async () => {
    try {
        await firebase.firestore().collection('consultas').doc(id_consulta).update({
            finalized: true,
        });
        window.location.replace('/codigo/src/modules/horarios_admin');
    } catch (error) {
        alert(`Erro ao atualizar a consulta`)
    }
})


function dadosPaciente() {
    firebase.storage().refFromURL(carteirinhaUrl).getDownloadURL().then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
            var blob = xhr.response
            const ex = getFileExtention(carteirinhaUrl);
            let tempUrl = URL.createObjectURL(xhr.response);
            const tempAElement = document.createElement("a");
            tempAElement.href = tempUrl;
            tempAElement.download = `downloaded_paciente-file.${ex}`;
            document.body.appendChild(tempAElement);
            tempAElement.click();
            URL.revokeObjectURL(tempUrl);
            tempAElement.remove();

        };
        xhr.open('GET', url);
        xhr.send();
        xhr.onloadend = () => {
            console.log('end')
        }

    })
}

function dadosPedido() {
    for (let exame of pedidosUrl) {
        firebase.storage().refFromURL(exame).getDownloadURL().then((url) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const ex = getFileExtention(exame);
                let tempUrl = URL.createObjectURL(xhr.response);
                const tempAElement = document.createElement("a");
                tempAElement.href = tempUrl;
                tempAElement.download = `downloaded_pedido-${pedidosUrl.indexOf(exame)}-file.${ex}`;
                document.body.appendChild(tempAElement);
                tempAElement.click();
                URL.revokeObjectURL(tempUrl);
                tempAElement.remove();
            };
            xhr.open('GET', url);
            xhr.send();

        })
    }

}

function isDataValid(data, fileType) {
    if (data == null || data == undefined) {
        alert("falha ao recuperar dados da consulta!")
        return false
    }
    if (data.files == null || data.files == undefined || data.files.length == 0) {
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
    return match ? match[0].slice(1) : "";
}

function createLocalData() {
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
    let file2 = {}
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