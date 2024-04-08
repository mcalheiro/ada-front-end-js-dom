function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('pt-BR', options);
}

function setCurrentDateTime() {
    const currentDateElement = document.getElementById('current-date');
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    currentDateElement.textContent = formatDate(now);
    currentTimeElement.textContent = formatTime(now);
}

setCurrentDateTime();
setInterval(setCurrentDateTime, 1000);