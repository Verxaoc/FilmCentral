document.addEventListener("DOMContentLoaded", () => {
    const leftContainer = document.getElementById('newMoviesLeft');
    const rightContainer = document.getElementById('newMoviesRight');

    // Фильтруем новинки
    const newMovies = movies.filter(movie => movie.isNew);

    // Делим их на две части для левой и правой колонки
    const half = Math.ceil(newMovies.length / 2);
    const leftMovies = newMovies.slice(0, half);
    const rightMovies = newMovies.slice(half);

    // Функция для отрисовки маленькой карточки
    const renderSmallCard = (movie) => `
        <div class="card shadow-sm">
            ${movie.poster
                ? `<img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="height: 150px; object-fit: cover;">` 
                : `<div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 150px;">Нет постера</div>`
            }
            <div class="card-body p-3">
                <h4 class="h6 card-title mb-1">${movie.title}</h4>
                <p class="text-muted small mb-2">${movie.year} • ${movie.genre}</p>
                <a href="movie.html?id=${movie.id}" class="btn btn-sm btn-outline-warning w-100">Подробнее</a>
            </div>
        </div>
    `;

    // Отрисовываем
    if(leftContainer) leftContainer.innerHTML = leftMovies.map(renderSmallCard).join('');
    if(rightContainer) rightContainer.innerHTML = rightMovies.map(renderSmallCard).join('');
});