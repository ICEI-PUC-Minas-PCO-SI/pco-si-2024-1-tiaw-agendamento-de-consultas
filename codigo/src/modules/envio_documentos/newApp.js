// Aqui é simulado algo externo no qual podemos enviar dados para e receber dados dele, como o firebase
var newMockDB = localStorage;
// Dados representando dados recebidos dessa aplicação externa
var dadosRecebidos = {
    user_id: "4b7b99b4-4b1e-44d4-8ce9-3306a684f21c",
    id_consulta: "fc62c0c4-e2b2-4683-a7c1-f8e1595bc6df",
    data_consulta: new Date()
}

newMockDB.setItem("dados-consulta", JSON.stringify(dadosRecebidos));

console.log(`Dados recebidos de fora: ${newMockDB.getItem("dados-consulta")}`);

function getUserID() {
    return JSON.parse(newMockDB.getItem("dados-consulta")).user_id;
}

function getConsultaID() {
    return JSON.parse(newMockDB.getItem("dados-consulta")).id_consulta;
}

// Representação do salvamento dos arquivos nessa aplicação externa, assim possibilitando que os mesmos sejam acessados depois.
function enviarArquivos(arquivos) {
    let arquivosFinais = [];
    let consultaID = getConsultaID();
    for(let i = 0; i < arquivos.length; i++) {
        
        let arquivoFinal = {
            file_id: crypto.randomUUID(),
            file_type: arquivos[i].tipo,
            url: arquivos[i].file.name
        }
        
        arquivosFinais.push(arquivoFinal);
    }
    // console.log(arquivosFinais);
    newMockDB.setItem(`consultas/${consultaID}`, JSON.stringify({
        user_id: getUserID(),
        id_consulta: getConsultaID(),
        files: arquivosFinais
    }));
    exibirDadosEnviados(arquivosFinais);
    exibirImagensEnviadas(arquivos);
}

newMockDB.removeItem(`consultas/${getConsultaID()}`);