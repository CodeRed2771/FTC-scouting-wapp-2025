let local = localStorage.local ? JSON.parse(localStorage.local) : {};
if(!local["matchData"]) local["matchData"] = {};
if(!local["matches"]) local["matches"] = [];


function setLS() {
    localStorage.local = JSON.stringify(local);
}

function submitMatch() {
    const now = new Date();
    const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = now.toLocaleString('en-US', options).replace(',', ' -');
    local.matchData["timestamp"] = formattedTime;
    local.matchData["compInput"] = "Kentwood";

    local.matches.push(local.matchData);

    let prevmatch = Number(local.matchData["matchInput"]);
    let prevscouter = local.matchData["nameInput"];

    local.matchData = {};

    local.matchData["matchInput"] = prevmatch + 1;
    local.matchData["nameInput"] = prevscouter;

    setLS();
    showPage(0);
    initMatch();
}

const AppScript = "https://script.google.com/macros/s/AKfycbyH98lv4q0ZmygXV3W8umWwuVkZVSLXVz8K4VajtRM9b7bJh_fbW-1gwp5V4lTuvl-R/exec";
async function send(data) {
    if(local["matches"] == "") {
        alert('Twin you aint got any data');
    } else {
        const formData = new FormData();
        formData.append("action", "addRows");
        formData.append("data", JSON.stringify(data));
        fetch(AppScript, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the server
            local["matches"] = [];
            setLS();
            alert('Match data submitted successfully');
        })
        .catch(error => {
            // Handle any errors
            console.log('Error:', error);
        });
    }
}


document.addEventListener("keydown", (e) => {
    if(e.key === " ") {
        console.log("Saved Matches:")
        console.table(local.matches);
        console.log(JSON.stringify(local));
    }
})