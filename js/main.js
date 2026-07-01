const chat = document.getElementById("chat");
const mainVideo = document.getElementById("main-video");
const thumbs = document.querySelectorAll(".thumb");
const input = document.getElementById("chat-text");
const sendBtn = document.getElementById("send-btn");

const messages = [
    ["Viewer1", "this stream feels wrong"],
    ["Alex", "why are there multiple feeds??"],
    ["GhostCam", "switch to camera 3"],
    ["user88", "I saw something move"],
    ["Mod", "please stay calm"],
    ["???", "he knows you're watching"],
    ["C0nner", "Why is the skinwalker so hot?"],
    ["Viewer23", "did anyone else hear that?"],
    ["GhostPing", "camera 3 keeps lagging for me"],
    ["Mira", "the hallway looks different now"],
    ["Watcher01", "it feels like it's watching us back"],
    ["Noah", "chat is acting weird on my end"],
    ["Kira", "did the lighting just change?"],
    ["MachoManRand", "OHHH YEAH"]
];

function addMessage() {
    const [user, text] = messages[Math.floor(Math.random() * messages.length)];

    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${user}</b>: ${text}`;

    chat.appendChild(div);

    if (chat.children.length > 8) {
        chat.removeChild(chat.firstChild);
    }
}

setInterval(addMessage, 2000);

// const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(t => {

       const src = t.getAttribute("data-src");

    t.src = src;
    t.muted = true;
    t.loop = true;
    t.playsInline = true;

    t.play();

    // t.addEventListener("click", () => {

    //     thumbs.forEach(x => x.classList.remove("active"));
    //     t.classList.add("active");

    //     const src = t.getAttribute("data-src");
    //     mainVideo.src = src;
    //     mainVideo.play();
    // });
});

thumbs.forEach(t => {
    t.addEventListener("click", () => {

        thumbs.forEach(x => x.classList.remove("active"));
        t.classList.add("active");

        const src = t.getAttribute("data-src");

        const currentTime = t.currentTime;

        // Switch main video
        mainVideo.src = src;

        mainVideo.addEventListener("loadedmetadata", () => {
            mainVideo.currentTime = currentTime;
            mainVideo.play();
        }, { once: true });
    });
});

function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `<b style="color:#7ad7ff">You</b>: ${text}`;

    chat.appendChild(div);

    if (chat.children.length > 8) {
        chat.removeChild(chat.firstChild);
    }
}

sendBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addUserMessage(text);
    input.value = "";
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});