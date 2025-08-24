document.addEventListener("DOMContentLoaded", function () {
    const paths = document.querySelectorAll("[class^='neon-curve'] path");
    const dots = document.querySelectorAll("[class^='neon-pulse']");
    
    function moveDot(dot, path, delay) {
        function animate() {
            let length = path.getTotalLength();
            let progress = ((performance.now() + delay) / 2000) % 1; // 2 секунды на полный цикл
            let point = path.getPointAtLength(progress * length);
            dot.setAttribute("cx", point.x);
            dot.setAttribute("cy", point.y);
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    paths.forEach((path, index) => {
        let delay = Math.random() * 2000; // Разный старт для каждой точки (0-2 сек задержка)
        moveDot(dots[index], path, delay);
    });
});
