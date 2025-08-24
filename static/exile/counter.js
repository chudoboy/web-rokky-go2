document.addEventListener("DOMContentLoaded", function () {
    function animateCounter(element, start, end, duration) {
        let startTime = null;

        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Используем более мягкую функцию замедления (ease-out cubic)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const value = Math.floor(easedProgress * (end - start) + start);
            element.innerText = value.toLocaleString() + "+"; // Добавляем "+"

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Настройки анимации для каждого числа
    const counters = [
        { selector: ".two h1", endValue: 20000, duration: 7000 }, // Увеличил до 7 секунд
        { selector: ".three h1", endValue: 30000, duration: 7000 },
        { selector: ".five h1", endValue: 50000, duration: 7000 }
    ];

    counters.forEach(counter => {
        const element = document.querySelector(counter.selector);
        if (element) {
            animateCounter(element, 0, counter.endValue, counter.duration);
        }
    });
});

