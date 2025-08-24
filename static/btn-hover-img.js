document.addEventListener("DOMContentLoaded", function () {
  const buttonConfigs = {
    "btn-4": "static/img/discount-shape-color.svg",
    "btn-5": "static/img/ruler&pen-color.svg",
    "btn-6": "static/img/bot-color.svg"
  };

  Object.keys(buttonConfigs).forEach(btnClass => {
    const buttons = document.querySelectorAll("." + btnClass);

    buttons.forEach(button => {

      let parent = button.closest(".mini-plshk, .mini-plshk2");
      if (!parent) return;

      const hoverImage = parent.querySelector(".img-hover");
      if (!hoverImage) return;

      button.addEventListener("mouseenter", () => {
        hoverImage.src = buttonConfigs[btnClass];
        hoverImage.style.opacity = "1";
      });

      button.addEventListener("mouseleave", () => {
        hoverImage.style.opacity = "0";
      });
    });
  });
});

