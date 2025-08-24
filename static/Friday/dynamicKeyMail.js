const keyEl = document.querySelector('.Key p');
const mailEl = document.querySelector('.Mail p');

// Разбиваем текст на <span>
function splitText(el, text, invisible = false, scattered = false) {
    el.innerHTML = '';
    for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        if (invisible) {
            span.style.opacity = '0';
        }
        if (scattered) {
            const angle = Math.random() * 2 * Math.PI;
            const distance = 40 + Math.random() * 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            const rotate = Math.random() * 360 - 180;
            span.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        }
        el.appendChild(span);
    }
}

// Анимация "взрыва"
function explodeText(el, callback) {
    const spans = el.querySelectorAll('.letter');
    spans.forEach(span => {
        const angle = Math.random() * 2 * Math.PI;
        const distance = 50 + Math.random() * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotate = Math.random() * 360 - 180;

        span.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        span.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        span.style.opacity = '0';
    });

    setTimeout(callback, 300);
}

// Анимация появления из "хаоса"
function assembleText(el) {
    const spans = el.querySelectorAll('.letter');
    spans.forEach(span => {
        span.style.transition = 'transform 0.4s ease-in, opacity 0.4s ease-in';
        span.style.transform = 'translate(0px, 0px) rotate(0deg)';
        span.style.opacity = '1';
    });
}

function generateKey() {
    const parts = [];
    for (let i = 0; i < 5; i++) {
        parts.push(Math.random().toString(36).substring(2, 6));
    }
    return parts.join('-');
}

function generateEmail() {
    const name = Math.random().toString(36).substring(2, 8);
    return `${name}@1secmail.com`;
}

// Основная функция с двойным эффектом
function updateWithExplosionAndAssembly(el, newText) {
    explodeText(el, () => {
        splitText(el, newText, true, true); // создаём новый текст рассыпанным и невидимым
        setTimeout(() => {
            assembleText(el); // собираем обратно
        }, 50); // чуть позже, чтобы был переход
    });
}

// Первичная инициализация
splitText(keyEl, keyEl.textContent);
splitText(mailEl, mailEl.textContent);

// Цикл
setInterval(() => {
    updateWithExplosionAndAssembly(keyEl, generateKey());
    updateWithExplosionAndAssembly(mailEl, generateEmail());
}, 4000);
