document.addEventListener("DOMContentLoaded", () => {
    // Загружаем навигацию
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            // Вставляем навигацию в начало body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Подсвечиваем активный пункт меню
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });

            // --- ЛОГИКА СМЕНЫ ТЕМЫ (перенесена сюда) ---
            const themeToggle = document.getElementById('themeToggle');
            const htmlElement = document.documentElement;
            
            // Проверяем сохраненную тему
            const savedTheme = localStorage.getItem('theme') || 'dark';
            htmlElement.setAttribute('data-bs-theme', savedTheme);

            if(themeToggle) {
                themeToggle.addEventListener('click', () => {
                    const currentTheme = htmlElement.getAttribute('data-bs-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    
                    document.body.classList.add('theme-transition');
                    htmlElement.setAttribute('data-bs-theme', newTheme);
                    localStorage.setItem('theme', newTheme);

                    setTimeout(() => {
                        document.body.classList.remove('theme-transition');
                    }, 500);
                });
            }
        });

    // Загружаем футер
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});