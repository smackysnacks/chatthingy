export let socket = new WebSocket("ws://localhost:8080/ws");

socket.onopen = function (event) {
    console.log("onopen event: " + event);
};

socket.onerror = function (event) {
    console.log("onerror event: " + event);
};

socket.onmessage = function(event) {
    console.log("message is: " + event.data);
};
