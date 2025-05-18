let countdownInterval;
    const startCountdown = (duration = 37) => {
        let seconds = duration;
        const countdownElement = document.getElementById('countdown-number');
        const progressElement = document.getElementById('progress');
        countdownElement.textContent = seconds;
        progressElement.style.width = '0%'; // Начинаем с 0%
        
        countdownInterval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            
            // Расчет прогресса (увеличивается от 0% до 100%)
            const progress = ((duration - seconds) / duration) * 100;
            progressElement.style.width = `${progress}%`;
            
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                progressElement.style.width = '100%';
                // Дополнительные действия по завершению
            }
        }, 1000);
    };

    const showOverlay = (duration = 37) => {
        // Сброс предыдущего отсчёта
        if (countdownInterval) clearInterval(countdownInterval);
        
        // Установка начальных значений
        document.getElementById('countdown-number').textContent = duration;
        document.getElementById('progress').style.width = '0%';
        
        // Показать overlay
        document.getElementById('overlay').classList.remove('hidden');
        
        // Запуск нового отсчёта
        startCountdown(duration);
    };

    const hideOverlay = () => {
        document.getElementById('overlay').classList.add('hidden');
        clearInterval(countdownInterval);
    };