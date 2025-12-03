import { auth, db, createUserProfile } from "./firebase.js";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Show Register Box
function showRegister() {
    document.querySelector(".login-container").style.display = "none";
    document.querySelector("#registerBox").style.display = "block";
}

// Hide Register Box
function hideRegister() {
    document.querySelector(".login-container").style.display = "block";
    document.querySelector("#registerBox").style.display = "none";
}

window.showRegister = showRegister;
window.hideRegister = hideRegister;

window.login = function () {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, pw)
    .then(() => {
        window.location.href = "dashboard.html";
    })
    .catch(e => alert("Login failed: " + e.message));
};

window.register = function () {
    const email = document.getElementById("regEmail").value;
    const pw = document.getElementById("regPassword").value;

    createUserWithEmailAndPassword(auth, email, pw)
    .then(async (cred) => {
        await createUserProfile(cred.user.uid, email);
        alert("Account created. You can now log in.");
        hideRegister();
    })
    .catch(e => alert("Registration failed: " + e.message));
};

// Auto redirect logged-in users
onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.endsWith("index.html")) {
        window.location.href = "dashboard.html";
    }
});
