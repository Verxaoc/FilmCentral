document.addEventListener("DOMContentLoaded", () => {
    const popularContainer = document.getElementById('popularMoviesContainer');
    const newContainer = document.getElementById('newMoviesContainer');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');

    function renderMovies(moviesList) {
        popularContainer.innerHTML = '';
        newContainer.innerHTML = '';

        moviesList.forEach(movie => {
            if (movie.isNew) {
                // Карточка новинки (компактная)
                newContainer.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-3">
                        <div class="card h-100 border-warning">
                            <div class="card-body">
                                <span class="badge bg-warning text-dark mb-2">Новинка</span>
                                <h3 class="h6 card-title"><a href="movie.html?id=${movie.id}" class="text-decoration-none text-dark">${movie.title}</a></h3>
                                <p class="small text-muted mb-0">${movie.genre} | ${movie.year}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else if (movie.rating >= 8.0) {
                // Карточка популярного фильма
                popularContainer.innerHTML += `
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm">
                            <!-- Заглушка вместо картинки, если нет постера -->
                            ${movie.poster 
                                ? `<img src="${movie.poster}" class="card-img-top" alt="Постер фильма ${movie.title}" style="height: 400px; object-fit: cover;">` 
                                : `<div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 400px;">Нет постера</div>`
                            }
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h3 class="h5 card-title mb-0">${movie.title}</h3>
                                    <span class="badge bg-success fs-6">★ ${movie.rating}</span>
                                </div>
                                <p class="text-muted small mb-3">${movie.year} • ${movie.genre}</p>
                                <a href="movie.html?id=${movie.id}" class="btn btn-outline-primary mt-auto">О фильме</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }

    // Отрисовка таблицы Топ-5
    const topMoviesTable = document.getElementById('topMoviesTable');
    if (topMoviesTable) {
        // Сортируем копию массива по убыванию рейтинга
        const top5 = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);
        
        topMoviesTable.innerHTML = top5.map((movie, index) => `
            <tr>
                <td><strong>${index + 1}</strong></td>
                <td><a href="movie.html?id=${movie.id}" class="text-decoration-none">${movie.title}</a></td>
                <td>${movie.year}</td>
                <td>${movie.genre}</td>
                <td><span class="badge bg-success">★ ${movie.rating}</span></td>
            </tr>
        `).join('');
    }

    function filterMovies() {
        const searchTerm = searchInput.value.toLowerCase();
        const genre = genreFilter.value;

        const filtered = movies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
            const matchesGenre = genre === 'all' || movie.genre === genre;
            return matchesSearch && matchesGenre;
        });

        filtered.sort((a, b) => b.rating - a.rating);

        renderMovies(filtered);
    }

    // Слушатели событий для поиска и фильтра
    searchInput.addEventListener('input', filterMovies);
    genreFilter.addEventListener('change', filterMovies);

    renderMovies(movies);
});