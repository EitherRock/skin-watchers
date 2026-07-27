const chat = document.getElementById("chat");
const mainVideo = document.getElementById("main-video");
const thumbs = document.querySelectorAll(".thumb");
const input = document.getElementById("chat-text");
const sendBtn = document.getElementById("send-btn");
const adSlides = document.querySelectorAll(".ad-slide");

let offlineMode = false;
let currentAd = 0;

function toggleOffline() {
    offlineMode = !offlineMode;

    document.body.classList.toggle("offline", offlineMode);
}

const messages = [
    ["Viewer1", "this stream feels wrong", "#ff6666"],
    ["Alex", "why are there multiple feeds??", "#66ccff"],
    ["GhostCam", "switch to camera 3", "#b388ff"],
    ["user88", "I saw something move", "#66dd99"],
    ["Mod", "please stay calm", "#ffcc66"],
    ["???", "he knows you're watching", "#ffffff"],
    ["C0nner", "Why is the skinwalker so hot?", "#ff66cc"],
    ["Viewer23", "did anyone else hear that?", "#ff9966"],
    ["GhostPing", "camera 3 keeps lagging for me", "#66ffff"],
    ["Mira", "the hallway looks different now", "#cc99ff"],
    ["Watcher01", "it feels like it's watching us back", "#ff4444"],
    ["Noah", "chat is acting weird on my end", "#99ccff"],
    ["Kira", "did the lighting just change?", "#99ff99"],
    ["MachoManRand", "OHHH YEAH", "#ffaa00"]
];

function addMessage() {
    const [user, text, color] = messages[Math.floor(Math.random() * messages.length)];

    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b style="color:${color}">${user}</b>: ${text}`;

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

document.addEventListener("keydown", (e) => {
    if (e.key === "o") {
        toggleOffline();
    }
});

function rotateAds() {
    // Remove active class from current image
    adSlides[currentAd].classList.remove("active");

    // Move to next image
    currentAd++;

    // Loop back to first image
    if (currentAd >= adSlides.length) {
        currentAd = 0;
    }

    // Show next image
    adSlides[currentAd].classList.add("active");
}

// Change ad every 4 seconds
setInterval(rotateAds, 5000);