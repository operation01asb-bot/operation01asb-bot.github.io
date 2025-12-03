function login() {
    const name = document.getElementById("username").value;
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("employeeName", name);
    document.getElementById("userNameDisplay").innerText = name;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("portalPage").style.display = "block";

    loadProgress();
}

function logout() {
    localStorage.removeItem("employeeName");
    location.reload();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll("#checklist input");
    let completed = 0;

    checkboxes.forEach(c => {
        if (c.checked) completed++;
    });

    const progress = Math.round((completed / checkboxes.length) * 100);
    document.getElementById("progressFill").style.width = progress + "%";

    localStorage.setItem("progress", progress);
}

function loadProgress() {
    const savedName = localStorage.getItem("employeeName");
    const savedProgress = localStorage.getItem("progress");

    if (savedName) {
        document.getElementById("userNameDisplay").innerText = savedName;
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("portalPage").style.display = "block";
    }

    if (savedProgress) {
        document.getElementById("progressFill").style.width = savedProgress + "%";
        const checkboxes = document.querySelectorAll("#checklist input");
        let completeCount = Math.round((savedProgress / 100) * checkboxes.length);

        for (let i = 0; i < completeCount; i++) {
            checkboxes[i].checked = true;
        }
    }
}
