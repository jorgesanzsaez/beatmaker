const tileArray = document.getElementsByClassName('tile');

const beat01 = new Audio(`Resources/Beats/0_01.flac`);
const beat02 = new Audio(`Resources/Beats/0_02.flac`);
const beat04 = new Audio(`Resources/Beats/0_04.flac`);
const beat06 = new Audio(`Resources/Beats/0_06.flac`);
const beat07 = new Audio(`Resources/Beats/0_07.flac`);
const beat08 = new Audio(`Resources/Beats/0_08.flac`);
const beat09 = new Audio(`Resources/Beats/0_09.flac`);
const beat11 = new Audio(`Resources/Beats/0_11.flac`);
const beat12 = new Audio(`Resources/Beats/0_12.flac`);
const beat16 = new Audio(`Resources/Beats/0_16.flac`);
const beat18 = new Audio(`Resources/Beats/0_18.flac`);
const beat21 = new Audio(`Resources/Beats/0_21.flac`);
const beat22 = new Audio(`Resources/Beats/0_22.flac`);
const beat24 = new Audio(`Resources/Beats/0_24.flac`);
const beat25 = new Audio(`Resources/Beats/0_25.flac`);
const beat28 = new Audio(`Resources/Beats/0_28.flac`);
const beat29 = new Audio(`Resources/Beats/0_29.flac`);
const beat31 = new Audio(`Resources/Beats/0_31.flac`);
const beat32 = new Audio(`Resources/Beats/0_32.flac`);
const beat33 = new Audio(`Resources/Beats/0_33.flac`);
const beat35 = new Audio(`Resources/Beats/0_35.flac`);
const beat41 = new Audio(`Resources/Beats/0_41.flac`);
const beat44 = new Audio(`Resources/Beats/0_44.flac`);
const beat47 = new Audio(`Resources/Beats/0_47.flac`);

for (i = 0; i < tileArray.length; i++) {
    let idNo = tileArray[i].classList[2];
    tileArray[i].addEventListener('click', () => {
        play(idNo)
    });
}

function play(x) {
    let element = document.getElementsByClassName(x)[0];

    let beat = eval("beat" + x);
    // Try eliminating eval with Function
    beat.play();

    let interval;

    function removeInterval() {
        element.classList.remove('active');
        beat.pause();
        beat.currentTime = 0;
        clearInterval(interval);
    }

    if (element.classList[3] === 'active') {
        removeInterval();
    } else {
        element.classList.add('active');
        interval = setInterval(() => {
            //console.log(audio.currentTime + ' of' + ' ' + audio.duration);
            if (beat.currentTime === beat.duration) {
                removeInterval();
            }
        }, 1000)
    }
}

document.getElementById('shareButton').addEventListener("click", async () => {
    try {
        await navigator.share({
            title: "Beatmaker by MMA",
            url: ""
        });
        console.log("Data was shared successfully");
    } catch (err) {
        console.error("Share failed:", err.message);
    }
});

let installPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    document.getElementById('installButton').style.display = 'unset';
    installPrompt = e;
});

document.getElementById('installButton').addEventListener('click', () => {
    installPrompt.prompt();
})

window.addEventListener('appinstalled', () => {
    confetti.start();
    setTimeout(() => {
        confetti.stop();
    }, 1000)
})

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}