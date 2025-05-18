let countdownInterval;
    const startCountdown = () => {
        let seconds = 37;
        const countdownElement = document.getElementById('countdown-number');
        countdownElement.textContent = seconds;
        
        countdownInterval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            
            if (seconds <= 0) {
                clearInterval(countdownInterval);
                // Дополнительные действия по завершению отсчёта
            }
        }, 1000);
    };

    // Показываем overlay и запускаем отсчёт
    const showOverlay = () => {
        document.getElementById('overlay').classList.remove('hidden');
        startCountdown();
    };

    // Скрываем overlay и останавливаем отсчёт
    const hideOverlay = () => {
        document.getElementById('overlay').classList.add('hidden');
        clearInterval(countdownInterval);
    };