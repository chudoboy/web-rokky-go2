document.addEventListener("DOMContentLoaded", function () {
    const pastaImage = document.getElementById("pasta2");
    const pastaText = document.querySelector(".pastatext2 h1");
    const pastaButton = document.querySelector(".pasta-btn");

    if (!pastaImage || !pastaText || !pastaButton) {
        console.error("Ошибка: Изображение, текст или кнопка не найдены!");
        return;
    }

    let hasScrolledDown = false;
    let imageAnimatedOnce = false;

    function isPastaFullyVisible() {
        const rect = pastaImage.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight && rect.bottom > 0; // Проверяем частичную видимость
    }

    function handleScroll() {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > 100) {
            hasScrolledDown = true;
        }

        if (hasScrolledDown && isPastaFullyVisible() && !imageAnimatedOnce) {
            imageAnimatedOnce = true;
            animatePasta();
            window.removeEventListener("scroll", handleScroll);
        }
    }

    function animatePasta() {
        pastaImage.classList.add("show");

        setTimeout(() => {
            pastaText.classList.add("show");
        }, 1500);

        setTimeout(() => {
            pastaButton.classList.add("show");
        }, 3000);
    }

    // Следим за скроллом
    window.addEventListener("scroll", handleScroll);
});

