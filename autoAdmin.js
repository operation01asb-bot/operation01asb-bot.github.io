import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    collection, getDocs, doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function initializeAdminAccount() {
    console.log("Checking if admin exists...");

    // Check Firestore for admin user
    const usersSnap = await getDocs(collection(db, "users"));
    let adminExists = false;

    usersSnap.forEach((u) => {
        if (u.data().role === "admin") {
            adminExists = true;
        }
    });

    if (adminExists) {
        console.log("Admin user already exists. No action needed.");
        return;
    }

    console.log("No admin found. Creating admin account...");

    const adminEmail = "admin@company.com";
    const adminPassword = "admin123";

    try {
        // Attempt to log in (in case it was created manually)
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
        console.log("Admin login exists, updating Firestore role...");

        const uid = auth.currentUser.uid;
        await setDoc(doc(db, "users", uid), {
            email: adminEmail,
            role: "admin",
            completedTasks: []
        });

        await auth.signOut();
        return;

    } catch (loginError) {
        console.log("Admin login not found, creating new admin user...");
    }

    // Create admin user
    try {
        const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        const uid = cred.user.uid;

        await setDoc(doc(db, "users", uid), {
            email: adminEmail,
            role: "admin",
            completedTasks: []
        });

        console.log("Auto-admin created successfully:", adminEmail);
        await auth.signOut();

    } catch (err) {
        console.error("Admin creation failed:", err.message);
    }
}

// Run on startup
initializeAdminAccount();
