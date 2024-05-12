// import { } from "https://www.gstatic.com/firebasejs/6.3.5/firebase-app.js";
// import { } from "https://www.gstatic.com/firebasejs/6.3.5/firebase-firestore.js";
// import { } from "https://www.gstatic.com/firebasejs/6.3.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC950Slq6RoGWoXUA4WU6O4iuQdzX_k-qQ",
  authDomain: "agendai-84d84.firebaseapp.com",
  projectId: "agendai-84d84",
  storageBucket: "agendai-84d84.appspot.com",
  messagingSenderId: "346989741208",
  appId: "1:346989741208:web:4838f4fc5cc1d1a36abced",
  measurementId: "G-RET5W0Q8SL"
};

firebase.initializeApp(firebaseConfig);




export const auth = firebase.auth();
export const firestore = firebase.firestore();