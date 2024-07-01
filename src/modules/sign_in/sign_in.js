//#region element references

const signincontroller = new SignInController();
const alert = document.getElementById("erroralert");
const nameEC = document.getElementById("signin-input-nome");
const lastNameEC = document.getElementById("signin-input-sobrenome");
const emailEC = document.getElementById("signin-input-email");
const passwordEC = document.getElementById("signin-input-senha");
const confirmpasswordEC = document.getElementById("signin-input-confirmsenha");
const documentoEC = document.getElementById("signin-input-documento");
const phoneEC = document.getElementById("signin-input-telefone");
const addressStreetEC = document.getElementById("signin-input-address-street");
const numberEC = document.getElementById("signin-input-address-number");
const complementEC = document.getElementById("signin-input-complemento");
const cityEC = document.getElementById("signin-input-address-cidade");
const stateEC = document.getElementById("signin-input-address-estado");
const docResponsavelEC = document.getElementById("signin-input-documento-responsavel")
const responsavelEC = document.getElementById("signin-input-responsavel")

const editButton = document.getElementById("editbutton")
const editDiv = document.getElementById("editdiv")

const signInButton = document.getElementById("signinbutton");

//#endregion


document.getElementById("signinbutton").addEventListener("click", register);
document.onload = init();



/**
 * Troca o estado dos inputs
 * @param {bool} enable 
 */
function switchEnabledFields(enabled) {
    if (!enabled) {
        nameEC.setAttribute('disabled', enabled)
        lastNameEC.setAttribute('disabled', enabled);
        if (!enabled) {
            emailEC.setAttribute('disabled', enabled);
            passwordEC.setAttribute('disabled', enabled);
            confirmpasswordEC.setAttribute('disabled', enabled)
            documentoEC.setAttribute('disabled', enabled)
        }
        phoneEC.setAttribute('disabled', enabled)
        addressStreetEC.setAttribute('disabled', enabled)
        numberEC.setAttribute('disabled', enabled)
        complementEC.setAttribute('disabled', enabled)
        cityEC.setAttribute('disabled', enabled)
        stateEC.setAttribute('disabled', enabled)
        responsavelEC.setAttribute('disabled', enabled)
        docResponsavelEC.setAttribute('disabled', enabled)
    } else {
        nameEC.removeAttribute('disabled', enabled)
        lastNameEC.removeAttribute('disabled', enabled);
        if (!enabled) {
            emailEC.removeAttribute('disabled', enabled);
            passwordEC.removeAttribute('disabled', enabled);
            confirmpasswordEC.removeAttribute('disabled', enabled)
            documentoEC.removeAttribute('disabled', enabled)
        }
        phoneEC.removeAttribute('disabled', enabled)
        addressStreetEC.removeAttribute('disabled', enabled)
        numberEC.removeAttribute('disabled', enabled)
        complementEC.removeAttribute('disabled', enabled)
        cityEC.removeAttribute('disabled', enabled)
        stateEC.removeAttribute('disabled', enabled)
        responsavelEC.removeAttribute('disabled', enabled)
        docResponsavelEC.removeAttribute('disabled', enabled)
    }
}

/**
 * Faz um update nos dados do usuario com o id recebido 
 *  e navega para a tela de seleção de consulta
 * @param {id} id do usuário referente 
 */
async function saveData(id) {
    const result = await signincontroller.updateUserData({
        id: id,
        firstName: nameEC.value.trim(),
        lastName: lastNameEC.value.trim(),
        phone: phoneEC.value.trim(),
        address: addressStreetEC.value.trim(),
        number: numberEC.value.trim(),
        complement: complementEC.value.trim(),
        city: cityEC.value.trim(),
        parentDocument: docResponsavelEC.value.trim(),
        parentName: responsavelEC.value.trim(),
    });
    if (result) {
        switchEnabledFields(false);
        signInButton.innerText = 'AVANÇAR'
        signincontroller.getUser(id).then((user) => {
            if (user) {
                fillInput(user.data());
            }
        });
        signInButton.removeEventListener('click', (event) => {
            event.preventDefault();
            saveData(id);
        }, false);
        signInButton.addEventListener('click', (event) => {
            event.preventDefault();

        })

    } else {
        window.alert('Erro ao salvar os dados');
        alert.innerText = "Erro ao salvar os dados";
        alert.hidden = false;
    }
}

/**
 Preenche os campos com os dados do banco de dados
 *  */
async function fillInput(userdata) {

    if (userdata.document) {
        documentoEC.value = userdata.document;
    }
    if (userdata.email) {
        emailEC.value = userdata.email;
    }
    if (userdata.first_name) {
        nameEC.value = userdata.first_name;
    }
    if (userdata.last_name) {
        lastNameEC.value = userdata.last_name;
    }
    if (userdata.parent_document) {
        docResponsavelEC.value = userdata.parent_document;
    }
    if (userdata.phone) {
        phoneEC.value = userdata.phone;
    }
    if (userdata.parent_name) {
        responsavelEC.value = userdata.parent_name;
    }
    if (userdata.full_address) {
        const address = userdata.full_address;
        const addressArray = address.split(",");
        addressStreetEC.value = addressArray[0];
        numberEC.value = addressArray[1];
        if (addressArray.length == 4) {
            cityEC.value = addressArray[2];
            stateEC.value = addressArray[3];
        } else {
            complementEC.value = addressArray[2]
            cityEC.value = addressArray[3];
            stateEC.value = addressArray[4];
        }
    }
}

/**
 * Verifica se na navegação foi recebido algum id
 * Se existe um id faz a busca no banco e verifca os dados do usuário
 */
function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        switchEnabledFields(false);

        signInButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.replace("./../attendance_type");
        })

        editDiv.hidden = false;
        editButton.addEventListener('click', (event) => {
            event.preventDefault();
            switchEnabledFields(true);
            signInButton.innerText = 'SALVAR'
            signInButton.removeEventListener('click', register)
            signInButton.addEventListener('click', (event) => {
                event.preventDefault();
                saveData(id);
            }, false);
        })

        signincontroller.getUser(id).then((user) => {
            if (user) {
                fillInput(user.data());
            } else {
                switchEnabledFields(true);
                signInButton.removeEventListener('click', (event) => {
                    event.preventDefault();
                    saveData(id);
                }, false);
                signInButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    register(event);
                }, false);
            }
        })
    }
}
const originalBorderColor = emailEC.style.borderColor;

/**
 * Faz a verificação dos campos e chama a classe que resolve a request de registro do usuário
 * @param {*} event 
 * @returns 
 */
async function register(event) {
    event.preventDefault();

    let hasError = false;

    if (nameEC.value.trim() == "") {
        nameEC.required = true;
        alert.hidden = false;
        hasError = true;
    }
    if (lastNameEC.value.trim() == "") {
        lastNameEC.required = true;
        alert.hidden = false;
        hasError = true;
    }


    if (phoneEC.value.trim() == "") {
        phoneEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;

    }

    if (addressStreetEC.value.trim() == "") {
        addressStreetEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;

    }
    if (numberEC.value.trim() == "") {
        numberEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;

    }
    if (cityEC.value.trim() == "") {
        cityEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;

    }
    if (stateEC.value.trim() == "") {
        stateEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;
    }


    const nomeResponsavel = responsavelEC.value.trim();
    const docmentoResponsavel = docResponsavelEC.value.trim();
    if ((nomeResponsavel != "") ^ (docmentoResponsavel != "")) {
        docResponsavelEC.required = true;
        responsavelEC.required = true;
        alert.hidden = false;
        alert.innerText = "Preencha todos os dados!"
        hasError = true;
    } else {
        docResponsavelEC.required = false;
        responsavelEC.required = false;
        alert.hidden = true;
    }

    



    if ((!emailEC.value) || emailEC.value.trim() == "") {
        alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\nEmail obrigatório!` : 'Email obrigatório!';
        emailEC.required = true;
        alert.hidden = false;
        hasError = true;

    } else {
        if ((!emailEC.value.trim().includes("@")) || (!emailEC.value.trim().includes("."))) {
            alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\nE-mail inválido!` : 'E-mail inválido!';
            emailEC.style.borderColor = "red";
            alert.hidden = false;
            hasError = true;
        } else {
            emailEC.style.borderColor = originalBorderColor;
            alert.hidden = true;
        }
    }

    if (passwordEC.value.trim() != confirmpasswordEC.value.trim()) {
        if (alert.innerText.length > 0) {

            alert.innerText += "\nAs senhas não coincidem!";
        } else {

            alert.innerText = "As senhas não coincidem!";
        }
        confirmpasswordEC.style.borderColor = "red";
        alert.hidden = false;
        hasError = true;

    } else {
        confirmpasswordEC.style.borderColor = originalBorderColor;
    }


    if (passwordEC.value.trim() == "") {
        alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\nPreencha a senha!` : 'Preencha a senha!';
        alert.hidden = false;
        passwordEC.required = true;
        hasError = true;

    }
    if (passwordEC.value.trim().length <= 6) {
        alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\nSenha muito curta!` : 'Senha muito curta!';
        alert.hidden = false;
        passwordEC.required = true;
        hasError = true;
    }

    if (documentoEC.value.trim() == "") {
        alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\n Documento inválido!` : 'Documento inválido!';
        documentoEC.style.borderColor = 'red';
        documentoEC.required = true;
        alert.hidden = false;
        hasError = true;

    } else {
        if (!(documentoEC.value.trim().match("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"))) {
            alert.innerText = alert.innerText.length > 0 ? `${alert.innerText}\nDocumento inválido!` : 'Documento inválido!';
            documentoEC.required = true;
            documentoEC.style.borderColor = 'red';
            alert.hidden = false;
            hasError = true;
        } else {
            documentoEC.style.borderColor = originalBorderColor;
        }
    }

    if (hasError) {
        alert.hidden = false;
        return;
    };
    signInButton.setAttribute("disabled", true);
    const result = await signincontroller.signUp({
        email: emailEC.value.trim(),
        password: passwordEC.value.trim(),
        firstName: nameEC.value.trim(),
        lastName: lastNameEC.value.trim(),
        phone: phoneEC.value.trim(),
        addres: addressStreetEC.value.trim(),
        document: documentoEC.value.trim(),
        number: numberEC.value.trim(),
        complement: complementEC.value != null ? complementEC.value.trim() : "",
        city: cityEC.value.trim(),
        state: stateEC.value.trim(),
        parentDocument: docmentoResponsavel.value != null ? docmentoResponsavel.value.trim() : "",
        parentName: nomeResponsavel.value != null ? nomeResponsavel.value.trim() : "",
    });

    if (result) {
        window.location.replace("./../login");
    }
    signInButton.setAttribute("disabled", false);
}
