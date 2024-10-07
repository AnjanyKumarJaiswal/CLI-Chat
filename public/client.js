const socket = io();
const sendbtn = document.getElementById('sendbtn');
const messageinput = document.getElementById('message');
const allmessags = document.getElementById('messages');


socket.on('message', (message) => {
    const li = document.createElement('li');
    li.innerText = message
    allmessags.appendChild(li);
});

messageinput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        sendbtn.click();
    }
});

sendbtn.addEventListener('click', (e) => {
    const message = messageinput.value;

    if (message) {
        console.log(`message sent: ${message}`);
        socket.emit('chatMessage', message);
        messageinput.value = '';
    }
});
