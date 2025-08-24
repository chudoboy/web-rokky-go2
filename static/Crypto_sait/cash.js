document.addEventListener("DOMContentLoaded", function () {
    function generateRandomAmount() {
        return "+ $" + (Math.floor(Math.random() * 900) + 100); // От 100 до 999
    }

    function updateAmounts() {
        document.querySelectorAll(".csh1").forEach((cashBox) => {
            let amountElement = cashBox.querySelector("h3");
            let currencyElement = cashBox.querySelector("h4");

            // Исчезновение перед обновлением
            amountElement.style.opacity = "0";
            amountElement.style.transform = "translateY(10px)";
            currencyElement.style.opacity = "0";
            currencyElement.style.transform = "translateY(10px)";

            setTimeout(() => {
                amountElement.textContent = generateRandomAmount();

                amountElement.style.opacity = "1";
                amountElement.style.transform = "translateY(0)";
                currencyElement.style.opacity = "1";
                currencyElement.style.transform = "translateY(0)";
            }, 500);
        });
    }

    setInterval(updateAmounts, 3000);
    updateAmounts();
});
