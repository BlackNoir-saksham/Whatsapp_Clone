const socket = io ("https://localhost:8000/");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("msgInput");
const messageContainer = document.querySelector(".msg");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const message = messageInput.value
  append(`You: ${message}`,'right')
  socket.emit('send', message)
  messageInput.value=''
})
const name = prompt("Enter your name to join");
console.log(`My name ${name}` )

socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});


socket.on('receive', data =>{
  append(`${data.user}: ${data.message}`, 'left')
})