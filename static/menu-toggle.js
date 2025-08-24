document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".con-knopki button");
    const texts = document.querySelectorAll('.con-text-mob .btn-text1');

    const iconMap = {
        "mob-btn":   { active: "static/repo.svg",             inactive: "static/repo-mob.svg"   },
        "mob-btn2":  { active: "static/octoface.svg",         inactive: "static/octoface-mob.svg" },
        "mob-btn3":  { active: "static/external-drive.svg",   inactive: "static/external-drive-mob.svg" },
        "mob-btn4":  { active: "static/lightbulb.svg",        inactive: "static/lightbulb-mob.svg" }
    };

    function setActive(btn) {
        buttons.forEach((otherBtn) => {
            const className = [...otherBtn.classList].find(cls => iconMap[cls]);
            if (className) {
                otherBtn.classList.remove("active-btn");
                otherBtn.querySelector("img").src = `img/${iconMap[className].inactive}`;
            }
        });

        texts.forEach((txt) => txt.classList.remove("active-text"));

        const className = [...btn.classList].find(cls => iconMap[cls]);
        if (className) {
            btn.classList.add("active-btn");
            btn.querySelector("img").src = `img/${iconMap[className].active}`;

            const index = Array.from(buttons).indexOf(btn);
            texts[index].classList.add("active-text");
        }
    }

    setActive(buttons[0]);

    buttons.forEach((btn) => {
        btn.addEventListener("click", function() {
            setActive(btn);
        });
    });
});
