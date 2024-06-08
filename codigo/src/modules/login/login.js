export class LoginController {

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
  
    login = async (email, password) => {
      try {
        if(firebase.apps.length == 0){

            await firebase.initializeApp(this._firebaseConfig);
        }
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    
  }
  

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

    const agendai = new LoginController();
    const credential = await agendai.login(email, password);
    if(credential == null){
        alert.innerText = "Login inválido";
        alert.hidden = false;
        
        return;
    }
    alert.hidden = true;
    $('.toast').hidden = false;
    $('.toast').toast('show');
    localStorage.setItem("credential", JSON.stringify(credential));
    window.location.replace(`/codigo/src/modules/sign_in/?id=${credential.user.uid}`);
});
