document.addEventListener("DOMContentLoaded", () => {
    // Загружаем навигацию
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            // Вставляем навигацию в начало body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Подсвечиваем активный пункт меню (опционально)
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // Загружаем футер
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            // Вставляем футер в конец body
            document.body.insertAdjacentHTML('beforeend', data);
        });
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', savedTheme);

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Включаем плавный переход
            document.body.classList.add('theme-transition');
            
            // Меняем тему
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Убираем класс перехода через 0.5 сек, чтобы не тормозило при скролле
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        });
    }
});