const chat = document.getElementById("chat");
const mainVideo = document.getElementById("main-video");
const thumbs = document.querySelectorAll(".thumb");
const input = document.getElementById("chat-text");
const sendBtn = document.getElementById("send-btn");
const adSlides = document.querySelectorAll(".ad-slide");

let offlineMode = false;
let currentAd = 0;
let userIndex = 0;
let chatLen = 12;

function toggleOffline() {
    offlineMode = !offlineMode;

    document.body.classList.toggle("offline", offlineMode);
}

const preloadedMessages = [
    ["EchoInTheFire", "I'm telling you look it up. A group of jelly fish is called a smack", "#ff6666", true, 1],
    ["Na10ism", "holy shit hes right", "#66ccff", true, 1],
    ["ZurrVx", "Who tf is dez", "#66dd99", true, 1],
    ["PhillyBombastic", "Im going to group of jelly fish your mom if you dont shut up", "#b388ff", true, 1],
    ["Psychoticillness", "Could anyone catch what they were talking about?", "#ffffff", true, 8],
    ["EchoInTheFire", "oh no he found us", "#ff6666", true, 2],
    ["Na10ism", "Do you think he'll find the other cameras too?", "#66ccff", true, 3],
    ["PhillyBombastic", "NO NO NO DONT DO THAT", "#b388ff", true, 5],
    ["ZurrVx", "I Cant see!", "#66dd99", true, 6],
    ["Heavens_death", "Bets on if he'll find the others?", "#ffcc66", true, 6],
    
];

const messages = [
    
    
    ["C0nner", "Why is the skinwalker so hot?", "#ff66cc", true, 9],
    ["InkedupSquid10_4", "did anyone else hear that?", "#ff9966", true, 9],
    ["SeductiveZeus", "camera 3 keeps lagging for me", "#66ffff", true, 10],
    ["X6skincrawler9X", "the hallway looks different now", "#cc99ff", true, 10],
    ["Flames_of_Havoc", "it feels like it's watching us back", "#ff4444", true, 11],
    ["Asphix67", "chat is acting weird on my end", "#99ccff", true, 12],
    ["TheMisnomer", "did the lighting just change?", "#99ff99", true, 12],
    ["MachoManRand", "OHHH YEAHh", "#ffaa00", true, 12]
];


for (let i = 0; i < preloadedMessages.length; i++) {
    addMessage(preloadedMessages);
}

userIndex = 0;

function addMessage(thread) {
    const [user, text, color, active] = thread[userIndex];

    if (active) {
        const div = document.createElement("div");
        div.className = "message";

        const username = document.createElement("b");
        username.className = "username";
        username.textContent = user;
        username.style.color = color;

        div.appendChild(username);
        div.appendChild(document.createTextNode(`: ${text}`));

        chat.appendChild(div);

        if (chat.children.length > chatLen) {
            chat.removeChild(chat.firstChild);
        }
    }

    userIndex += 1;
    console.log(userIndex);
}

setInterval(() => addMessage(messages), 1000);


// DONT DELETE LINES BELOW
// mainVideo.addEventListener('timeupdate', () => {

//     while(
//         userIndex < messages.length && 
//         mainVideo.currentTime >= messages[userIndex][4]
        
//     ) {
//         console.log(mainVideo.currentTime);
//         addMessage(messages)
//     }

// })



thumbs.forEach(t => {

       const src = t.getAttribute("data-src");

    t.src = src;
    t.muted = true;
    t.loop = true;
    t.playsInline = true;

    t.play();
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
            console.log("video duration");
            console.log(mainVideo.duration);
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