document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return; // Если кнопки нет на странице — выходим

    // Отслеживаем прокрутку страницы
    window.addEventListener("scroll", () => {
        // Если прокрутили больше 300px, показываем кнопку
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // Обработка клика по кнопке
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Плавная прокрутка
        });
    });
});