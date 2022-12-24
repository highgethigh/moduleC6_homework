const btn = document.querySelector('.js-btn');

btn.addEventListener('click', () => {
    alert(`Размер экрана вашего устройства: ${window.screen.width} × ${window.screen.height}`);
});