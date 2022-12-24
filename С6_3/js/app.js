const wsUri = "ws://echo-ws-service.herokuapp.com"; // заносим в переменную эхо-сервер

const btn = document.querySelector('.js-btn');


btn.addEventListener('click', () => { // вешаем обработчик события на button
    
    const text = document.querySelector('.js-text').value; // получаем значение введеное из input

    // Сообщение пользователя
    const outputUser = document.getElementById('outputUser');
    outputUser.innerHTML += `<p id="outputUser" style="visibility:visible">User: ${text}</p>`; // Вывод его сообщения

    let websocket = new WebSocket(wsUri);// создаем экземпляр класса WebSocket для работы с данным протоколом

    // объекту websocket присваиваем 4 callback 

    websocket.onopen = function(e) {
        console.log("Соединение установлено");
        console.log("Отправляем данные на сервер");
        websocket.send(text);
      };
      
    websocket.onmessage = function(event) {
        console.log(`Данные получены с сервера: ${event.data}`);
        // Сообщение от сервера
        const outputServer = document.getElementById('outputServer');
        outputServer.innerHTML += `<p id="outputServer" style="visibility:visible">Server: ${event.data}</p>`;
    };
      
    websocket.onclose = function(event) {
        if (event.wasClean) {
          console.log(`Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } 
        else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          console.log('[close] Соединение прервано');
        }
    };
      
    websocket.onerror = function(error) {
        console.log(`[error]`);
    };

    
})

// geo
const geoBtn = document.querySelector('.js-btn-geo'); 

geoBtn.addEventListener('click', () => {

    const error = () => {
        console.log(`Невозможно получить ваше местоположение`);
    };

    const succes = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

        let websocket = new WebSocket(wsUri);// создаем экземпляр класса WebSocket для работы с данным протоколом

        websocket.onopen = function(e) {   // Передаем данные о местоположение серверу!
            console.log("Соединение установлено");
            console.log("Отправляем данные на сервер");
            websocket.send(geoLink);
        };

        const geoPostion = document.getElementById('GEO');
        geoPostion.innerHTML = `<p style="visibility:visible; text-align: left;
        border-color: blue;
        border-radius: 4px;
        border-style: solid;
        margin-left: 140px;
        margin-right: 4px;"><a href="${geoLink}" target="_blank">Гео-позиция</a></p>`;

    };

    if(!navigator.geolocation) {
        console.log(`Geolocation не поддерживается вашим браузером`);
    }
    else {
        console.log(`Определение местоположения...`);
    }
    navigator.geolocation.getCurrentPosition(succes,error);
})