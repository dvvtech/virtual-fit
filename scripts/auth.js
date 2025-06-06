function tryGoogleAuth() {
    tryAuth('google');
}

function tryVkAuth() {
    tryAuth('vk');
}

function tryYandexAuth() {
    tryAuth('yandex');
}

function tryAuth(provider) {
    fetch(`${API_BASE_URL}/api/${provider}-auth`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка при получении URL для авторизации через ${provider}`);
            }
            return response.text();
        })
        .then(url => {
            if (!url) {
                throw new Error(`URL для перенаправления (${provider}) не найден в ответе`);
            }
            window.location.href = url;
        })
        .catch(error => {
            console.error(`Произошла ошибка при авторизации через ${provider}:`, error);
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


    if (accessToken && refreshToken) {
        // Если токены есть — скрываем кнопки входа и показываем Logout
        authButtons.style.display = 'none';
        logoutBtn.style.display = 'block';
        tryOnButton.style.display = 'block';
        
        //const savedRemainingUsage = localStorage.getItem('remainingUsage');
        //if (savedRemainingUsage) {
            //const remainingUsageContainer = document.getElementById('remainingUsageContainer');
            //const remainingUsageField = document.getElementById('remainingUsage');
            //remainingUsageContainer.style.display = 'block';
            //remainingUsageField.textContent = savedRemainingUsage;
        //}

    } else {
        // Если токенов нет — показываем кнопки входа и скрываем Logout
        authButtons.style.display = 'block';
        logoutBtn.style.display = 'none';
        tryOnButton.style.display = 'none';        
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
