let chats = {};
let currentChatId = null;
let currentChat = 1;

function startNewChat() {

    const chatId = "chat_" + currentChat;
    const title = "Chat " + currentChat;

    chats[chatId] = "";

    currentChatId = chatId;

    const history = document.getElementById("chat-history");

    const chatItem = document.createElement("div");

    chatItem.className = "history-item";
    chatItem.textContent = title;

    chatItem.addEventListener("click", () => {
        loadChat(chatId);
    });

    history.appendChild(chatItem);

    currentChat++;

    document.getElementById("chat-box").innerHTML = `
        <div class="welcome-card">
            <h1>👋 Welcome to RapidQuake</h1>
            <p>Your AI-powered disaster preparedness and emergency response assistant.</p>
        </div>
    `;

    document.getElementById("message").value = "";
}

function loadChat(chatId) {

    currentChatId = chatId;

    if (chats[chatId]) {
        document.getElementById("chat-box").innerHTML =
            chats[chatId];
    }
}


function getTime() {

    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}

function scrollBottom() {

    const chatBox =
        document.getElementById("chat-box");

    chatBox.scrollTop =
        chatBox.scrollHeight;

}

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("active");

}

function quickMessage(text) {

    document.getElementById("message").value =
        text;

    sendMessage();

}

async function sendMessage() {

    const input =
        document.getElementById("message");

    const chatBox =
        document.getElementById("chat-box");

    const message =
        input.value.trim();

    if(!message) return;

    const welcome =
        document.querySelector(".welcome-card");

    if(welcome){
        welcome.remove();
    }

    chatBox.innerHTML += `
<div class="user-wrapper">

    <div class="user-message">

        ${message}

        <div class="time">
            ${getTime()}
        </div>

    </div>

</div>
`;

if(currentChatId){
    chats[currentChatId] = chatBox.innerHTML;
}

    input.value = "";

    scrollBottom();

    const typingId =
        "typing-" + Date.now();

        chatBox.innerHTML += `
<div class="bot-wrapper" id="${typingId}">

    <div class="avatar bot-avatar">
        🤖
    </div>

    <div class="typing">
        <span></span>
        <span></span>
        <span></span>
    </div>

</div>
`;
  
    scrollBottom();

    try{

        const response = await fetch("/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message,
        location: userLocation
    })
});

        const data =
            await response.json();

        document
            .getElementById(typingId)
            .remove();

        chatBox.innerHTML += `
<div class="bot-wrapper">

    <div class="avatar bot-avatar">
        🤖
    </div>

    <div class="bot-message">

        ${data.response}

        <div class="time">
            ${getTime()}
        </div>

    </div>

</div>
`;
if(currentChatId){
    chats[currentChatId] = chatBox.innerHTML;
}


    function speakText(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

        scrollBottom();

    }
    catch(error){

        console.error(error);

    }

    

}

function startVoice() {

    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice recognition is not supported in this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("message").value =
            transcript;

        sendMessage();
    };

    recognition.onerror = function(event) {
        console.error(event.error);
    };
}


document.addEventListener("DOMContentLoaded", () => {

    const newChatBtn = document.getElementById("newChatBtn");

    newChatBtn.addEventListener("click", startNewChat);

    startNewChat();
});

function speakText(text) {

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
}

let userLocation = null;

function getLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation not supported");

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            userLocation = {

                latitude: position.coords.latitude,
                longitude: position.coords.longitude

            };

            alert("Location detected successfully!");

            console.log(userLocation);

        },

        function(error) {

            alert("Location access denied.");

        }

    );
}

window.onload = function() {

    console.log("Page Loaded");

    getLocation();

};

function showShelters() {

    const chatBox = document.getElementById("chat-box");

    const welcome = document.querySelector(".welcome-card");

    if(welcome){
        welcome.remove();
    }

    chatBox.innerHTML += `

    <div class="bot-wrapper">

        <div class="avatar bot-avatar">
            🤖
        </div>

        <div class="bot-message">

            <b>🏠 Nearby Shelters</b>

            <div class="shelter-card">

                <h4>🏠 Community Hall</h4>

                <p>📍 1.2 km away</p>

                <a
                    href="https://www.google.com/maps?q=18.5204,73.8567"
                    target="_blank">
                    🗺 Open Location
                </a>

            </div>

            <div class="shelter-card">

                <h4>🏠 Municipal School</h4>

                <p>📍 2.5 km away</p>

                <a
                    href="https://www.google.com/maps?q=18.5235,73.8600"
                    target="_blank">
                    🗺 Open Location
                </a>

            </div>

            <div class="shelter-card">

                <h4>🏠 Relief Center</h4>

                <p>📍 3.1 km away</p>

                <a
                    href="https://www.google.com/maps?q=18.5280,73.8650"
                    target="_blank">
                    🗺 Open Location
                </a>

            </div>

        </div>

    </div>
    `;

    scrollBottom();
}