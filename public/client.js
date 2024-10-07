const socket = io();
const sendbtn = document.getElementById('sendbtn');
const messageinput = document.getElementById('message');
const allmessags = document.getElementById('messages');
// import { User , Chat } from "../server/models/chat.schema";

socket.on('chatMessage', ({ Messagetext, user, sent }) => {
    const li = document.createElement('li');
    const time = new Date(sent).toLocaleTimeString();
    li.textContent = `${user.displayName} [${time}]: ${Messagetext}`;
    allmessags.appendChild(li);
});

messageinput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        e.preventDefault();
        sendbtn.click();
    }
});

function sendMessage() {
    const message = messageinput.value;
    if (message) {
        console.log(`message sent: ${message}`);
        socket.emit('chatMessage', { googleId: userId, chatId: chatId, Messagetext: message });
        messageinput.value = '';
    }
}

// sendbtn.addEventListener('click', (e) => {
//     const message = messageinput.value;

//     if (message) {
//         console.log(`message sent: ${message}`);
//         socket.emit('chatMessage', {  Messagetext: message });
//         messageinput.value = '';
//     }
// });

sendbtn.addEventListener('click', sendMessage);