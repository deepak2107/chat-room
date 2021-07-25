const socket = io('https://chatrooms--deepak.herokuapp.com/');

const form = document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio =  new Audio('ting.mp3');

const append = (message, position, type)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageElement.classList.add(type);
    messageContainer.append(messageElement);
    if (position=='left'){
    audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You : ${message}`, 'right', 'sent');
    socket.emit('send', message);
    messageInput.value='';
})

const myname = prompt(" enter your name to join");
socket.emit('new-user-joined', myname);

socket.on('user-joined', myname =>{
    append(`${myname} joined the chat`, 'right','join');
})

socket.on('receive', data =>{
    append(`${data.myname}: ${data.message}`, 'left', 'receive');
})

socket.on('left', myname =>{
    append(`${myname} left the chat`, 'left', 'join');
})
