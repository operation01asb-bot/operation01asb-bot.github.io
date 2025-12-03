// Load tasks from localStorage
function getTasks() {
    return JSON.parse(localStorage.getItem("onboardingTasks") || "[]");
}

// Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem("onboardingTasks", JSON.stringify(tasks));
}

// Load completed tasks
function getCompleted() {
    return JSON.parse(localStorage.getItem("completedTasks") || "[]");
}

// Save completed tasks
function saveCompleted(list) {
    localStorage.setItem("completedTasks", JSON.stringify(list));
}
