import { Auth } from "/codigo/src/core/auth.js";


document.getElementById("loginbutton").addEventListener("click", async function (event) {
    event.preventDefault();
    var alert = document.getElementById("erroralert");

    const email = document.getElementById("login-input-email").value.trim();
    const password = document.getElementById("login-input-password").value.trim();
    if (email.length == 0 || password.length == 0) {
        alert.innerText = "Preencha todos os campos!"
        alert.hidden = false;
        return;
    } else if (!email.includes("@") || !email.includes(".")) {
        alert.innerText = "Email inválido";
        alert.hidden = false;
        return;
    }

    const agendai = new Auth();
    const credential = await agendai.login(email, password);
    if(credential == null){
        alert.innerText = "Login inválido";
        alert.hidden = false;
        return;
    }
    alert.hidden = true;
    window.alert("Login Com sucesso!")
    localStorage.setItem("credential", credential);
    window.location.replace("/codigo/src/modules/welcome");
});

