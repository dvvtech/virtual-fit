let countdownInterval;
    const startCountdown = (duration = 37) => {
        let seconds = duration;
        const countdownElement = document.getElementById('countdown-number');
        const progressElement = document.getElementById('progress');
        countdownElement.textContent = seconds;
        
        countdownInterval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            progressElement.style.width = `${(seconds/duration)*100}%`;
            
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                // Дополнительные действия по завершению
            }
        }, 1000);
    };

    const showOverlay = (duration = 37) => {
        // Сброс предыдущего отсчёта
        if (countdownInterval) clearInterval(countdownInterval);
        
        // Установка начальных значений
        document.getElementById('countdown-number').textContent = duration;
        document.getElementById('progress').style.width = '100%';
        
        // Показать overlay
        document.getElementById('overlay').classList.remove('hidden');
        
        // Запуск нового отсчёта
        startCountdown(duration);
    };

    const hideOverlay = () => {
        document.getElementById('overlay').classList.add('hidden');
        clearInterval(countdownInterval);
    };