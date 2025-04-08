
function tryGoogleAuth() {

    fetch(`${API_BASE_URL}/api/google-auth`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при получении URL для авторизации');
            }
            return response.text(); // Получаем ответ как plain text
        })
        .then(url => {
            if (url) {
                window.location.href = url; // Перенаправляем пользователя
            } else {
                throw new Error('URL для перенаправления не найден в ответе');
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            // Можно добавить уведомление пользователя об ошибке
        });
}

function tryVkAuth() {

    fetch(`${API_BASE_URL}/api/vk-auth`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при получении URL для авторизации');
            }
            return response.text(); // Получаем ответ как plain text
        })
        .then(url => {
            if (url) {
                window.location.href = url; // Перенаправляем пользователя
            } else {
                throw new Error('URL для перенаправления не найден в ответе');
            }
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
            // Можно добавить уведомление пользователя об ошибке
        });
}

function tryLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    checkAuthState();
}

function checkAuthState() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const authButtons = document.getElementById('authButtons');
    const logoutBtn = document.getElementById('logoutBtn');

    if (accessToken && refreshToken) {
        // Если токены есть — скрываем кнопки входа и показываем Logout
        authButtons.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        // Если токенов нет — показываем кнопки входа и скрываем Logout
        authButtons.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}
