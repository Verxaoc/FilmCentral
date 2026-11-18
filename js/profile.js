document.addEventListener("DOMContentLoaded", () => {
    // 1. Инициализация LocalStorage (если пусто)
    if (!localStorage.getItem('userMovies')) {
        localStorage.setItem('userMovies', JSON.stringify({ watched: [], planned: [], favorite: [] }));
    }

    // 2. Отрисовка профиля (если мы на странице profile.html)
    if (document.getElementById('watchedList')) {
        renderProfile();
    }

    // 3. Обработка кнопок "Сохранить" на странице фильма
    const saveBtns = document.querySelectorAll('.save-btn');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const status = e.target.getAttribute('data-status');
            // Получаем ID фильма из URL
            const urlParams = new URLSearchParams(window.location.search);
            const movieId = parseInt(urlParams.get('id'));
            
            let userMovies = JSON.parse(localStorage.getItem('userMovies'));
            
            // Проверяем, нет ли уже этого фильма в списке
            if (!userMovies[status].includes(movieId)) {
                userMovies[status].push(movieId);
                localStorage.setItem('userMovies', JSON.stringify(userMovies));
                alert('Фильм успешно добавлен!');
            } else {
                alert('Этот фильм уже есть в этом списке.');
            }
        });
    });

    // 4. Обработка Мастера оценок (Модальное окно)
    const ratingInputs = document.querySelectorAll('.rating-input');
    ratingInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Обновляем цифру рядом с ползунком
            const valSpan = document.getElementById(e.target.id.replace('Score', 'Val'));
            if(valSpan) valSpan.textContent = e.target.value;
        });
    });

    const saveRatingBtn = document.getElementById('saveRatingBtn');
    if(saveRatingBtn) {
        saveRatingBtn.addEventListener('click', () => {
            const movieId = saveRatingBtn.getAttribute('data-movie-id');
            const ratings = {
                plot: document.getElementById('plotScore').value,
                acting: document.getElementById('actingScore').value,
                visual: document.getElementById('visualScore').value
            };
            // Сохраняем оценки
            let userRatings = JSON.parse(localStorage.getItem('userRatings')) || {};
            userRatings[movieId] = ratings;
            localStorage.setItem('userRatings', JSON.stringify(userRatings));
            
            alert('Оценки сохранены!');
            // Закрываем модалку
            const modal = bootstrap.Modal.getInstance(document.getElementById('ratingModal'));
            modal.hide();
        });
    }

    // Функция отрисовки Личного кабинета
    function renderProfile() {
        const userMovies = JSON.parse(localStorage.getItem('userMovies'));
        
        // Отрисовка списков
        const renderList = (listId, movieIds) => {
            const container = document.getElementById(listId);
            if (movieIds.length === 0) {
                container.innerHTML = '<li class="list-group-item bg-transparent text-muted border-0 px-0">Пока пусто</li>';
                return;
            }
            container.innerHTML = movieIds.map(id => {
                const movie = movies.find(m => m.id === id);
                return movie ? `<li class="list-group-item bg-transparent border-secondary px-0"><a href="movie.html?id=${id}" class="text-decoration-none text-white">${movie.title}</a></li>` : '';
            }).join('');
        };

        renderList('watchedList', userMovies.watched);
        renderList('plannedList', userMovies.planned);
        renderList('favoriteList', userMovies.favorite);

        // Статистика
        document.getElementById('totalWatched').textContent = userMovies.watched.length;
        
        // Статистика по жанрам (на основе просмотренных)
        const genreCounts = {};
        userMovies.watched.forEach(id => {
            const movie = movies.find(m => m.id === id);
            if (movie) {
                genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1;
            }
        });

        const genreContainer = document.getElementById('genreStats');
        if (Object.keys(genreCounts).length === 0) {
            genreContainer.innerHTML = '<p class="text-muted mb-0">Добавьте фильмы в "Просмотрено", чтобы увидеть статистику.</p>';
        } else {
            genreContainer.innerHTML = Object.entries(genreCounts).map(([genre, count]) => `
                <div class="d-flex justify-content-between mb-2">
                    <span>${genre}</span>
                    <span class="badge bg-warning text-dark">${count}</span>
                </div>
            `).join('');
        }
    }
});