document.addEventListener("DOMContentLoaded", function () {
    const targetText = "Сайт начинается с html.";
    const textElement = document.getElementById("animatedText");

    function showBlock(block, transition = 'opacity 0.7s, transform 0.7s', cb) {
        if (!block) { if(cb) cb(); return; }
        block.style.opacity = 0;
        block.style.transform = 'translateY(40px)';
        setTimeout(() => {
            block.style.transition = transition;
            block.style.opacity = 1;
            block.style.transform = 'translateY(0)';
            if(cb) setTimeout(cb, 700);
        }, 0);
    }

    function showBlocksInOrder(blocks, stepDelay = 650, done) {
        let i = 0;
        function next() {
            if (i < blocks.length) {
                showBlock(blocks[i], undefined, next);
                i++;
            } else if (typeof done === "function") {
                done();
            }
        }
        next();
    }

    function showAllPlaskiPrices(callback) {
        const prices = Array.from(document.querySelectorAll('.con-plaski-price'));
        showBlocksInOrder(prices, 500, callback);
    }

    function showAllPlashki(callback) {
        const plashki = document.querySelectorAll(
            ".ryad1 .plashka, .ryad1 .plashka2, .ryad2 .mini-plshk, .ryad2 .mini-plshk2"
        );
        let i = 0;
        function next() {
            if (i < plashki.length) {
                plashki[i].classList.add("animate-plashka");
                i++;
                setTimeout(next, 400);
            } else if (typeof callback === "function") {
                setTimeout(callback, 300);
            }
        }
        next();
    }

    function startAnimationChain() {
        const isMobile = window.innerWidth <= 440;
        const conMob = document.querySelector('.con-mob');
        const conPortfolioMob = document.querySelector('.con-portfolio-mob');
        const conVarningMob = document.querySelector('.con-varning-mob'); // новый!
        const conSaits = document.querySelector('.con-saits');
        const conPortfolio = document.querySelector('.con-portfolio');

        if (isMobile) {
            fadeInText(textElement, targetText, 100, () => {
                showBlock(conMob, undefined, () => {
                    showBlock(conSaits, undefined, () => {
                        showBlock(conPortfolioMob, undefined, () => {
                            showBlock(conVarningMob, undefined, () => {
                                showAllPlaskiPrices();
                            });
                        });
                    });
                });
            });
        } else {
            fadeInText(textElement, targetText, 100, () => {
                showAllPlashki(() => {
                    showBlock(conSaits, undefined, () => {
                        showBlock(conPortfolio, undefined, () => {
                            showAllPlaskiPrices();
                        });
                    });
                });
            });
        }
    }

    function fadeInText(element, text, interval = 100, callback) {
        element.textContent = "";
        text.split("").forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.opacity = "0";
            span.style.transition = "opacity 0.5s";
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = "1";
                if (index === text.length - 1 && typeof callback === "function") {
                    setTimeout(callback, 500);
                }
            }, index * interval);
        });
    }

    startAnimationChain();
});
