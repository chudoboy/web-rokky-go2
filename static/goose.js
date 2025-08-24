window.addEventListener("DOMContentLoaded", function () {
    const goose = document.querySelector('.goose');
    const cherta = document.querySelector('.cherta');
    if (!goose || !cherta) return;

    const gooseFrames = [
        "static/img/step-1.svg",
        "static/img/step-2.svg",
        "static/img/step4.svg",
        "static/img/step-3.svg",
        "static/img/step-5.svg",
        "static/img/step-6.svg"
    ];

    // Предзагружаем кадры!
    preloadImages(gooseFrames, startGooseAnimation);

    function preloadImages(paths, allLoadedCallback) {
        let loaded = 0;
        for (let i = 0; i < paths.length; i++) {
            const img = new Image();
            img.src = paths[i];
            img.onload = () => {
                loaded++;
                if (loaded === paths.length) allLoadedCallback();
            };
            img.onerror = () => {
                loaded++;
                if (loaded === paths.length) allLoadedCallback();
            };
        }
    }

    function startGooseAnimation() {
        let frameIndex = 0;
        let direction = 1;
        let position = 0;

        function animateGoose() {
            const lineWidth = cherta.offsetWidth;
            const gooseWidth = goose.offsetWidth;
            const maxPosition = lineWidth - gooseWidth;

            position += direction * 2.5;

            if (position >= maxPosition) {
                position = maxPosition;
                direction = -1;
                goose.style.transform = "scaleX(-1)";
            }
            if (position <= 0) {
                position = 0;
                direction = 1;
                goose.style.transform = "scaleX(1)";
            }

            goose.style.left = position + "px";

            frameIndex = (frameIndex + 1) % gooseFrames.length;
            goose.src = gooseFrames[frameIndex];

            setTimeout(animateGoose, 90);
        }

        setTimeout(animateGoose, 120);
    }
});


