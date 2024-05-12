class SignInController {


    constructor() {
        this._firebaseConfig = {
            apiKey: "AIzaSyC950Slq6RoGWoXUA4WU6O4iuQdzX_k-qQ",
            authDomain: "agendai-84d84.firebaseapp.com",
            projectId: "agendai-84d84",
            storageBucket: "agendai-84d84.appspot.com",
            messagingSenderId: "346989741208",
            appId: "1:346989741208:web:4838f4fc5cc1d1a36abced",
            measurementId: "G-RET5W0Q8SL"
        };
    }
    signUp = async (email, password, firstName, lastName, phone, document, addres, number, complement, city, state, parentName, parentDocument) => {
        try {
            await firebase.initializeApp(this._firebaseConfig);
            const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log(credential);
        } catch (error) {
            console.log(error);
        }
    }
}

document.getElementById("signinbutton").addEventListener("click", async function (event) {
    event.preventDefault();
    var alert = document.getElementById("erroralert");
    const name = document.getElementById("signin-input-nome");
    const lastName = document.getElementById("signin-input-sobrenome");
    const email = document.getElementById("signin-input-email");
    const senha = document.getElementById("signin-input-senha");
    const confirmsenha = document.getElementById("signin-input-confirmsenha");
    const documento = document.getElementById("signin-input-documento");
    const telefone = document.getElementById("signin-input-telefone");
    const addressStreet = document.getElementById("signin-input-address-street");
    const numero = document.getElementById("signin-input-address-number");
    const complemento = document.getElementById("signin-input-complemento");
    const cidade = document.getElementById("signin-input-address-cidade");
    const estado = document.getElementById("signin-input-address-estado");

    if (name.value.trim() == "") {
        name.required = true;
        alert.hidden = false;
        return;
    }
    if (lastName.value.trim() == "") {
        lastName.required = true;
        alert.hidden = false;
        return;
    }
    const emailBorderColor = email.style.borderColor;
    if (email.value.trim() == "") {
        email.required = true;
        alert.innerText = "Email obrigatório!";
        alert.hidden = false;
        return;
    }else{
        if ((!email.value.trim().includes("@")) || (!email.value.trim().includes("."))) {
            alert.innerText = "E-mail inválido!";
            email.style.borderColor = "red";
            alert.hidden = false;
            return;
        } else {
            alert.innerText = "E-mail inválido!";
            email.style.borderColor = emailBorderColor;
            alert.hidden = true;
        }
    }

    if (senha.value.trim() == "") {
        alert.innerText = "Preencha a senha!";
        alert.hidden = false;
        senha.required = true;
        return;
    }

    if (senha.value.trim() != confirmsenha.value.trim()) {
        alert.innerText = "As senhas não coincidem!";
        confirmsenha.style.borderColor = "red";
        alert.hidden = false;
        return;
    } else {
        confirmsenha.style.borderColor = emailBorderColor;
    }

    if (telefone.value.trim() == "") {
        telefone.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    }

    if (documento.value.trim() == "") {
        documento.required = true;
        alert.hidden = false;
        alert.innerText = "Documento inválido"
        return;
    } else {
        if (documento.value.trim().match("/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/")) {
            alert.innerText = "Documento inválido"
            documento.required = true;
            alert.hidden = false;
        }
    }
    
    if (addressStreet.value.trim() == "") {
        addressStreet.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    }
    if (numero.value.trim() == "") {
        numero.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    }

    if (cidade.value.trim() == "") {
        cidade.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    }
    if (estado.value.trim() == "") {
        estado.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    }

    const nomeResponsavel = document.getElementById("signin-input-responsavel").value.trim();
    const docmentoResponsavel = document.getElementById("signin-input-documento-responsavel").value.trim();

    if ((nomeResponsavel != "") ^ (docmentoResponsavel != "")) {
        document.getElementById("signin-input-documento-responsavel").required = true;
        document.getElementById("signin-input-responsavel").required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        return;
    } else {
        document.getElementById("signin-input-documento-responsavel").required = false;
        document.getElementById("signin-input-responsavel").required = false;
        alert.hidden = true;
    }

    const signincontroller = new SignInController();
    const result = await signincontroller.signUp(
        email.value.trim(),
        senha.value.trim(),
        name.value.trim(),
        lastName.value.trim(),
        telefone.value.trim(),
        documento.value.trim(),
        addressStreet.value.trim(),
        numero.value.trim(),
        complemento.value != null ? complemento.value.trim() : "",
        cidade.value.trim(), estado.value.trim(),
        estado.value.trim(),
        nomeResponsavel.value != null ? nomeResponsavel.value.trim() : "",
        docmentoResponsavel.value != null ? docmentoResponsavel.value.trim() : "");
        
    window.alert("Cadastro com sucesso");
    window.location.replace("/codigo/src/modules/login");
});


