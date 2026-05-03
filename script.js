// Save user input history
function saveHistory(input) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(input);
    localStorage.setItem("history", JSON.stringify(history));
}

// Show history
function showHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length === 0) {
        document.getElementById("output").innerText = "No history yet.";
    } else {
        document.getElementById("output").innerText = "History:\n" + history.join("\n");
    }
}

// Clear history
function clearHistory() {
    localStorage.removeItem("history");
    document.getElementById("output").innerText = "History cleared!";
}

// Quick buttons
function quickAsk(text) {
    document.getElementById("userInput").value = text;
    handleInput();
}

// Main function
function handleInput() {
    let input = document.getElementById("userInput").value.toLowerCase().trim();
    let response = "";

    if (input === "") {
        document.getElementById("output").innerText = "Please enter something!";
        return;
    }

    saveHistory(input);

    let hour = new Date().getHours();

    if (input.includes("exam")) {
        if (input.includes("tomorrow")) {
            response = "Last day strategy:\n- Revise important topics\n- Avoid new topics\n- Sleep early";
        } else {
            response = "Prepare consistently and practice daily.";
        }
    }
    else if (input.includes("study")) {
        if (hour < 12) {
            response = "Morning tip: Study difficult subjects first.";
        } else {
            response = "Evening tip: Revise and practice problems.";
        }
    }
    else if (input.includes("tired")) {
        response = "Take a break, hydrate, and relax your mind.";
    }
    else {
        response = "Ask about exams, study, or productivity!";
    }

    // Save to Firebase
    import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js")
    .then(({ collection, addDoc }) => {
        addDoc(collection(window.db, "queries"), {
            userInput: input,
            response: response,
            time: new Date()
        });
    });

    document.getElementById("output").innerText = response;
}