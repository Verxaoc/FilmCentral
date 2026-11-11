document.addEventListener("DOMContentLoaded", () => {
    // Получаем ID фильма из URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'));
    
    // Находим фильм в базе
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        document.getElementById('movieDetails').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Фильм не найден. Вернитесь на <a href="index.html" class="alert-link">главную</a>.
            </div>
        `;
        return;
    }

    document.getElementById('breadcrumbTitle').textContent = movie.title;
    document.title = `${movie.title} – Кино-База`;

    // Генерируем HTML для вкладок с рецензиями
    let criticsReviews = movie.reviews.critics.map(r => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-primary fw-bold">${r.author}</h6>
                    <span class="badge bg-primary">Оценка: ${r.rating}/10</span>
                </div>
                <p class="card-text mt-2">"${r.text}"</p>
            </div>
        </div>
    `).join('');

    let usersReviews = movie.reviews.users.map(r => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h6 class="card-subtitle mb-2 text-success fw-bold">${r.author}</h6>
                    <span class="badge bg-success">Оценка: ${r.rating}/10</span>
                </div>
                <p class="card-text mt-2">"${r.text}"</p>
            </div>
        </div>
    `).join('');

    // Формируем основную страницу
    document.getElementById('movieDetails').innerHTML = `
        <div class="row g-4 mt-2">
            <!-- Левая колонка: Постер и рейтинг -->
            <div class="col-12 col-md-4">
                <div class="card shadow-sm mb-3">
                    <div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 400px;">
                        Постер фильма
                    </div>
                    <div class="card-body text-center">
                        <h1 class="h3 mb-1">${movie.title}</h1>
                        <p class="text-muted mb-3">${movie.year} • ${movie.genre}</p>
                        <h2 class="display-5 text-success mb-0">★ ${movie.rating}</h2>
                    </div>
                </div>
            </div>

            <!-- Правая колонка: Информация, ссылки на актеров -->
            <div class="col-12 col-md-8">
                <div class="alert alert-info" role="alert">
                    <strong>О фильме:</strong> ${movie.description}
                </div>
                
                <h3 class="h5 mt-4 border-bottom pb-2">Съёмочная группа и актеры</h3>
                <p class="mb-1"><strong>Режиссер:</strong> <a href="#" class="text-decoration-none">${movie.director}</a></p>
                <p><strong>В ролях:</strong> 
                    ${movie.cast.map(actor => `<a href="#" class="badge bg-secondary text-decoration-none fs-6 me-1">${actor}</a>`).join('')}
                </p>

                <!-- Компонент Tabs (Вкладки) для рецензий -->
                <h3 class="h5 mt-5 border-bottom pb-2">Рецензии</h3>
                <ul class="nav nav-tabs" id="reviewTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="critics-tab" data-bs-toggle="tab" data-bs-target="#critics" type="button" role="tab">Критики</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab">Зрители</button>
                    </li>
                </ul>
                <div class="tab-content bg-white p-3 border border-top-0 rounded-bottom" id="reviewTabsContent">
                    <div class="tab-pane fade show active" id="critics" role="tabpanel">
                        ${criticsReviews || '<p class="text-muted">Рецензий от критиков пока нет.</p>'}
                    </div>
                    <div class="tab-pane fade" id="users" role="tabpanel">
                        ${usersReviews || '<p class="text-muted">Рецензий от зрителей пока нет.</p>'}
                    </div>
                </div>
                
                <div class="mt-4">
                    <a href="index.html" class="btn btn-outline-secondary">← Назад в каталог</a>
                </div>
            </div>
        </div>
    `;
});