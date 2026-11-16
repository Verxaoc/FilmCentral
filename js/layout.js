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