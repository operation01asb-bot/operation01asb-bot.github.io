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
    localStorage.removeItem("onboardProgress");
    location.reload();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    let completed = 0;

    checkboxes.forEach(c => {
        if (c.checked) completed++;
    });

    const total = checkboxes.length;
    const progress = Math.round((completed / total) * 100);

    document.getElementById("progressFill").style.width = progress + "%";

    localStorage.setItem("onboardProgress", progress);
}

function loadProgress() {
    const savedName = localStorage.getItem("employeeName");
    const savedProgress = localStorage.getItem("onboardProgress");

    if (savedName) {
        document.getElementById("userNameDisplay").innerText = savedName;
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("portalPage").style.display = "block";
    }

    if (savedProgress) {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        const totalBoxes = checkboxes.length;
        const countToCheck = Math.round((savedProgress / 100) * totalBoxes);

        for (let i = 0; i < countToCheck; i++) {
            checkboxes[i].checked = true;
        }

        document.getElementById("progressFill").style.width = savedProgress + "%";
    }
}
