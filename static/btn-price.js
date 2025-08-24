document.addEventListener("DOMContentLoaded", function () {
  const talkButtons = [
    {
      buttonClass: ".talk",
      cardSelector: ".price1",
      backImgSelector: ".back-img-price img",
      mainImgSelector: ".price-name img",
      backImgGray: "static/img/global-price-gray.svg",
      backImgColor: "static/img/global-price-color.svg",
      mainImgGray: "static/img/global.svg",
      mainImgColor: "static/img/global-color.svg"
    },
    {
      buttonClass: ".talk2",
      cardSelector: ".price2",
      backImgSelector: ".back-img-price2 img",
      mainImgSelector: ".price-name img",
      backImgGray: "static/img/github-action.svg",
      backImgColor: "static/img/github-action-color.svg",
      mainImgGray: "static/img/tgbot.svg",
      mainImgColor: "static/img/tgbot-color.svg"
    },
    {
      buttonClass: ".talk3",
      cardSelector: ".price1:last-of-type", 
      backImgSelector: ".back-img-price3 img",
      mainImgSelector: ".price-name img",
      backImgGray: "static/img/brush.svg",
      backImgColor: "static/img/brush-color.svg",
      mainImgGray: "static/img/bucket.svg",
      mainImgColor: "static/img/bucket-color.svg"
    }
  ];

  talkButtons.forEach(config => {
    const button = document.querySelector(config.buttonClass);
    const card = document.querySelector(config.cardSelector);

    if (!button || !card) return;

    const backImg = card.querySelector(config.backImgSelector);
    const mainImg = card.querySelector(config.mainImgSelector);

    if (!backImg || !mainImg) return;

    button.addEventListener("mouseenter", () => {
      backImg.style.transition = "opacity 0.3s";
      mainImg.style.transition = "opacity 0.3s";
      backImg.style.opacity = "0";
      mainImg.style.opacity = "0";

      setTimeout(() => {
        backImg.src = config.backImgColor;
        mainImg.src = config.mainImgColor;
        backImg.style.opacity = "1";
        mainImg.style.opacity = "1";
      }, 300);
    });

    button.addEventListener("mouseleave", () => {
      backImg.style.transition = "opacity 0.3s";
      mainImg.style.transition = "opacity 0.3s";
      backImg.style.opacity = "0";
      mainImg.style.opacity = "0";

      setTimeout(() => {
        backImg.src = config.backImgGray;
        mainImg.src = config.mainImgGray;
        backImg.style.opacity = "1";
        mainImg.style.opacity = "1";
      }, 300);
    });
  });
});
