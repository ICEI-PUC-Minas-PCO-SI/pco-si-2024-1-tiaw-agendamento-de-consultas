var arquivosLocal = [];

function lerDadosLocais() {
    return arquivosLocal;
}
// Salva as imagens selecionadas na variável arquivosLocal
function criarDadosLocais(arquivos, tipo) {
    removerDadosLocaisPorTipo(tipo);
    if(arquivos.length == 0) {
        return;
    }

    for(let i = 0; i < arquivos.length; i++) {
        arquivosLocal.push({
            file: arquivos[i],
            tipo: tipo
        });
    }
}
// Remove da variável arquivosLocal as variáveis que forem do tipo especificado
function removerDadosLocaisPorTipo(tipo) {
    for(let i = 0; i < arquivosLocal.length; i++) {
        if(arquivosLocal[i].tipo == tipo) {
            arquivosLocal.splice(i, 1);
        }
    }
}