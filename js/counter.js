document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    
    // Настройки анимации
    const speed = 200; // Чем меньше число, тем быстрее анимация (200 = 200мс на одно обновление)

    // Функция для запуска анимации конкретного счетчика
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target'); // Получаем конечное число
        const count = +counter.innerText; // Текущее число (начинается с 0)
        
        // Вычисляем шаг (сколько прибавлять за один тик)
        // Делим цель на 100, чтобы анимация была плавной
        const inc = target / 100; 

        if (count < target) {
            // Если текущее число меньше цели, прибавляем шаг и округляем
            counter.innerText = Math.ceil(count + inc);
            // Повторяем через 20 миллисекунд
            setTimeout(() => animateCounter(counter), 20);
        } else {
            // Когда достигли цели, ставим точное число
            counter.innerText = target;
        }
    };

    // Используем Intersection Observer, чтобы анимация начиналась только тогда, 
    // когда пользователь доскроллит до этого блока (это выглядит очень эффектно)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Отключаем наблюдение после запуска
            }
        });
    }, { threshold: 0.5 }); // 0.5 означает, что блок должен показаться на 50%

    // Запускаем наблюдение за каждым счетчиком
    counters.forEach(counter => {
        observer.observe(counter);
    });
});