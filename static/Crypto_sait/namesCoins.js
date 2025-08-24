document.addEventListener("DOMContentLoaded", function () {
    const memeCoins = ["Solana", "DogeCoin", "Shiba Inu", "PepeCoin", "Floki", "Bonk", "BabyDoge"];
    const randomNames = ["CryptoKing", "MoonTrader", "ElonDoge", "MemeWhale", "ShibaMaster", "BonkMan", "SolanaBoy", "PumpGuru"];

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function updateNamesAndCoins() {
        document.querySelectorAll(".csh1").forEach((cashBox) => {
            let nameElement = cashBox.querySelector("h1");
            let coinElement = cashBox.querySelector("h2");

            // Фиксируем ширину, предотвращаем смещение
            let maxWidth = Math.max(nameElement.offsetWidth, coinElement.offsetWidth);
            nameElement.style.width = maxWidth + "px";
            coinElement.style.width = maxWidth + "px";
            nameElement.style.textAlign = "left";
            coinElement.style.textAlign = "left";
            
            // Анимация исчезновения
            nameElement.style.opacity = "0";
            nameElement.style.transform = "translateY(10px)";
            coinElement.style.opacity = "0";
            coinElement.style.transform = "translateY(10px)";

            setTimeout(() => {
                nameElement.textContent = getRandomElement(randomNames);
                coinElement.textContent = getRandomElement(memeCoins);
            }, 250);
            
            setTimeout(() => {
                // Анимация появления
                nameElement.style.opacity = "1";
                nameElement.style.transform = "translateY(0)";
                coinElement.style.opacity = "1";
                coinElement.style.transform = "translateY(0)";
            }, 500);
        });
    }

    setInterval(updateNamesAndCoins, 3000);
    updateNamesAndCoins();
});
