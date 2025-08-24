document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("scrollPlayVideo");
    const scrabElements = document.querySelector(".scrab");

    if (!video || !scrabElements) {
        console.error("Ошибка: Видео или элементы скраба не найдены!");
        return;
    }

    let videoPlayedOnce = false;
    let hasScrolledDown = false; // Отслеживает, скроллил ли пользователь вниз

    function isVideoFullyVisible() {
        const rect = video.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top >= 0 && rect.bottom <= windowHeight; // Проверяем полную видимость
    }

    function handleScroll() {
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > 100) { // Проверяем, начал ли пользователь скроллить вниз
            hasScrolledDown = true;
        }

        if (hasScrolledDown && isVideoFullyVisible() && !videoPlayedOnce) {
            video.play();
            videoPlayedOnce = true;
            window.removeEventListener("scroll", handleScroll); // Убираем обработчик скролла
        }
    }

    // Ждём окончания видео, затем плавно показываем элементы
    video.addEventListener("ended", function () {
        scrabElements.style.transition = "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";
        scrabElements.style.opacity = "1";
        scrabElements.style.transform = "translateY(0)";
    });

    // Изначально скрываем элементы .scrab
    scrabElements.style.opacity = "0";
    scrabElements.style.transform = "translateY(50px)";

    // Следим за скроллом
    window.addEventListener("scroll", handleScroll);
});

