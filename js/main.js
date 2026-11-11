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
                            <div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">
                                Постер ${movie.title}
                            </div>
                            <div class="card-body d-flex flex-column">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h3 class="h5 card-title mb-0">${movie.title}</h3>
                                    <span class="badge bg-success fs-6">★ ${movie.rating}</span>
                                </div>
                                <p class="text-muted small mb-3">${movie.year} • ${movie.genre}</p>
                                <a href="movie.html?id=${movie.id}" class="btn btn-outline-primary mt-auto">Подробнее о фильме</a>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
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