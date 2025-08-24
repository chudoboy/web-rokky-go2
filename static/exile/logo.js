document.addEventListener("DOMContentLoaded", function () {
    fetch("Img/x.svg") // Загружаем SVG-файл
        .then(response => response.text()) // Преобразуем в текст
        .then(svgData => {
            document.getElementById("svg-container").innerHTML = svgData; // Вставляем SVG
            let path = document.querySelector("#svg-container path"); // Получаем путь внутри SVG
            let length = path.getTotalLength(); // Длина пути

            // Настроим анимацию рисования обводки
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.animation = "draw 3s ease-in-out forwards";

            // Устанавливаем начальную прозрачность для заливки
            path.style.fill = "black"; // ЧЁРНЫЙ цвет заливки
            path.style.fillOpacity = "0"; 

            // Запускаем анимацию заливки через 3 секунды (после обводки)
            setTimeout(() => {
                path.style.transition = "fill-opacity 1.5s ease-in-out";
                path.style.fillOpacity = "1"; // Делаем заливку видимой
            }, 3000); // 3 секунды (время анимации обводки)

            
        })
        .catch(error => console.error("Ошибка загрузки SVG:", error));
});

