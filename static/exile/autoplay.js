document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("firstVideo");
    const buttons = document.querySelector(".knopki");

    if (!video || !buttons) {
        console.error("Ошибка: Видео или кнопки не найдены!");
        return;
    }

    let videoPlayedOnce = false;
    const stopTime = 3.44; // Останавливаем видео на 4 секунде

    // Отслеживаем время воспроизведения
    video.addEventListener("timeupdate", function () {
        if (video.currentTime >= stopTime) {
            console.log(`Видео достигло ${stopTime} секунд, останавливаем.`);
            video.pause();
            video.currentTime = stopTime; // Фиксируем на 4-й секунде
            videoPlayedOnce = true;

            // Показываем кнопки плавно
            setTimeout(() => {
                buttons.style.visibility = "visible";
                buttons.style.opacity = "1";
                console.log("Кнопки появились!");
            }, 500);
        }
    });

    // Если видео уже проигралось один раз, запрещаем его повторное воспроизведение
    video.addEventListener("play", function () {
        if (videoPlayedOnce) {
            console.log("Видео уже проигралось. Не разрешаем воспроизведение.");
            video.pause();
        }
    });
});
