// Nesse arquivo é onde é gerenciado a interação com o document


var divEnviarCarteirinha = document.getElementById("btn-enviar-carteirinha");
var divEnviarPedidoMedico = document.getElementById("btn-enviar-pedido-medico");
// Dois elementos em que cada um representa a quantidade de arquivos selecionados
var spanQntdImgsCarteirinha = document.getElementById("span-quantidade-imagens-carteirinha");
var spanQntdImgsPedido = document.getElementById("span-quantidade-imagens-pedido");
// Esses dois são inputs que estão com display none (escondidos), que servem para a escolha da imagem
var inputEnviarCarteirinha = document.getElementById("inputImgCarteirinha");
var inputEnviarPedidoMedico = document.getElementById("inputImgPedido");
// Botão de enviar
var btnEnviar = document.getElementById("btn-enviar");
// Elemento <p> para mostrar mensagens de erro, ou avisos na tela.
var pMensagemRetorno = document.getElementById("mensagem-retorno");
// Elemento para mostrar quais dados foram enviados
var divDadosEnviados = document.getElementById("div-enviados");


// Mostrar nome imagens - Pega as imagens selecionadas e exibe o nome delas
function exibirNomeImagens(imagens, tipo) {
    let divPreviewImages = document.getElementById(`preview-images-${tipo}`);
    divPreviewImages.innerText = "";
    for(let i = 0; i < imagens.length; i++) {
        let imgName = document.createElement('p');
        imgName.innerText = imagens[i].name
        divPreviewImages.appendChild(imgName);
    }
}

// Exibir dados enviados - Mostra na tela os dados enviados
function exibirDadosEnviados(dados) {
    divDadosEnviados.innerHTML = "";
    for(let i = 0; i < dados.length; i++) {
        let elementP = document.createElement('p');
        elementP.style.color = "green";
        let id = dados[i].file_id;
        let tipo = dados[i].file_type;
        let url = dados[i].url;
        elementP.innerHTML = `ID do arquivo enviado: ${id} <br> Tipo do arquivo enviado: ${tipo} <br> URL do arquivo enviado: ${url}`;
        divDadosEnviados.appendChild(elementP);
    }
}
function exibirImagensEnviadas(dados) {
    let divElement = document.createElement('div');
    divElement.style.display = "flex";
    divElement.style.justifyContent = "center";
    for(let i = 0; i < dados.length; i++) {
        let elementImg = document.createElement('img');
        elementImg.style.maxWidth = "10%";
        console.log(dados[i]);
        elementImg.src = URL.createObjectURL(dados[i].file);
        divElement.appendChild(elementImg);
    }
    divDadosEnviados.appendChild(divElement);
}




// EVENT LISTENERS

// Ativando input de imagem ao apertar na DIV de seleção da imagem
divEnviarCarteirinha.addEventListener('click', () => {
    inputEnviarCarteirinha.click();
});

divEnviarPedidoMedico.addEventListener('click', () => {
    inputEnviarPedidoMedico.click();
});

// Evento ativado ao selecionar as imagens em cada input, atualizando o elemento <span> que mostra a quantidade de arquivos selecionados
inputEnviarCarteirinha.addEventListener('change', event => {
    spanQntdImgsCarteirinha.innerText = event.target.files.length;
    // criarDadosLocal(event.target.files, "carteirinha");
    criarDadosLocais(event.target.files, "carteirinha");
    exibirNomeImagens(event.target.files, "carteirinha");
})
inputEnviarPedidoMedico.addEventListener('change', event => {
    spanQntdImgsPedido.innerText = event.target.files.length;
    criarDadosLocais(event.target.files, "pedido");
    exibirNomeImagens(event.target.files, "pedido");
})

btnEnviar.addEventListener("click", () => {
    if(inputEnviarCarteirinha.files[0] && inputEnviarPedidoMedico.files[0]) {
        pMensagemRetorno.style.color = "green";
        pMensagemRetorno.innerText = "Enviado!";

        enviarArquivos(lerDadosLocais());
    }
    else {
        alert("Insira os arquivos antes de enviar");
        pMensagemRetorno.style.color = "red";
        pMensagemRetorno.innerText = "Não enviado! Insira os arquivos antes."
    }
});