function generateRandomKey(length = 11) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'; // Набор символов
    let key = '';
    for (let i = 0; i < length; i++) {
        key += chars[Math.floor(Math.random() * chars.length)];
    }
    return key;
}

function updateKeysLive() {
    document.querySelectorAll('.nbr1 p, .nbr2 p, .nbr3 p, .nbr4 p, .nbr5 p, .nbr6 p').forEach(p => {
        let currentText = p.textContent || generateRandomKey();
        let newText = '';
        
        for (let i = 0; i < currentText.length; i++) {
            if (Math.random() > 0.5) {
                newText += generateRandomKey(1); // Заменяем символ случайным
            } else {
                newText += currentText[i]; // Оставляем прежний символ
            }
        }
        p.textContent = newText;
    });
}

// Обновляем символы с эффектом "матрицы"
setInterval(updateKeysLive, 100);

// Инициализируем сразу при загрузке страницы
updateKeysLive();
