document.addEventListener("DOMContentLoaded", () => {
    const leftContainer = document.getElementById('newMoviesLeft');
    const rightContainer = document.getElementById('newMoviesRight');

    // Функция для отрисовки маленькой карточки (вынесена отдельно для удобства)
    const renderSmallCard = (movie, isUpcoming = false) => {
        // Форматируем дату, если она есть
        let dateBadge = '';
        if (movie.releaseDate) {
            const date = new Date(movie.releaseDate);
            // Форматируем в вид ДД.ММ.ГГГГ
            const formattedDate = date.toLocaleDateString('ru-RU');
            dateBadge = `<div class="badge bg-warning text-dark w-100 mb-2">Премьера: ${formattedDate}</div>`;
        } else if (isUpcoming) {
            dateBadge = `<span class="badge bg-warning text-dark mb-2">Скоро</span>`;
        }

        // Если рейтинга нет (0), показываем прочерк вместо звездочек
        const ratingDisplay = movie.rating > 0 
            ? `<span class="badge bg-success fs-6">★ ${movie.rating}</span>` 
            : '';

        return `
        <div class="card shadow-sm">
            ${movie.poster
                ? `<img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="height: 150px; object-fit: cover;">` 
                : `<div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 150px;">Нет постера</div>`
            }
            <div class="card-body p-3">
                ${dateBadge}
                <h4 class="h6 card-title mb-1">${movie.title}</h4>
                <p class="text-muted small mb-2">${movie.genre}</p>
                <a href="movie.html?id=${movie.id}" class="btn btn-sm btn-outline-warning w-100 mt-auto">Подробнее</a>
            </div>
        </div>
        `;
    };

    // 1. Левая колонка: Новинки (isNew: true)
    const newMovies = movies.filter(movie => movie.isNew === true);
    if (leftContainer) {
        leftContainer.innerHTML = newMovies.map(movie => renderSmallCard(movie)).join('');
    }

    // 2. Правая колонка: Скоро в кино (status: "upcoming")
    const upcomingMovies = movies.filter(movie => movie.status === "upcoming");
    if (rightContainer) {
        rightContainer.innerHTML = upcomingMovies.map(movie => renderSmallCard(movie, true)).join('');
    }
});
