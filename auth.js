
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

function tryYandexAuth() {

    fetch(`${API_BASE_URL}/api/yandex-auth`)
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
    const tryOnButton = document.getElementById('tryOnButton');
    const remainingUsageContainer = document.getElementById('remainingUsageContainer');
    

    if (accessToken && refreshToken) {
        // Если токены есть — скрываем кнопки входа и показываем Logout
        authButtons.style.display = 'none';
        logoutBtn.style.display = 'block';
        tryOnButton.style.display = 'block';
        remainingUsageContainer.style.display = 'block';
    } else {
        // Если токенов нет — показываем кнопки входа и скрываем Logout
        authButtons.style.display = 'block';
        logoutBtn.style.display = 'none';
        tryOnButton.style.display = 'none';
        remainingUsageContainer.style.display = 'none';
    }
}

async function makeAuthenticatedRequest(url, options) {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        tryLogout();
        throw new Error('Session expired. Please login again.');
    }

    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (response.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            tryLogout();
            throw new Error('Session expired. Please login again.');
        }

        try {
            const newTokens = await refreshAccessToken(refreshToken);
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${newTokens.accessToken}`
                }
            });
        } catch (error) {
            tryLogout();
            throw error;
        }
    }

    return response;
}

async function refreshAccessToken(refreshToken) {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const { accessToken: accessToken, refreshToken: newRefreshToken } = await response.json();

    localStorage.setItem('accessToken', accessToken);
    if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
    }

    return { accessToken, refreshToken: newRefreshToken };
}
