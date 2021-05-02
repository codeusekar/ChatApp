const chatForm = document.getElementById('chat')
const scrollDiv = document.getElementById('scrollDown')

const { name } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

// join chat room
socket.emit('enterRoom', name)


socket.on('message', (message) => {
    printMessage(message)

    // scroll to bottom
    scrollDiv.scrollIntoView()
})

// Message submit
chatForm.addEventListener('submit', (event) => {
    // prevent refeshing the page
    event.preventDefault()

    const message = event.target.message.value
    
    // Emit message to server
    socket.emit('chatMessage', message)
    
    event.target.message.value = ''
    event.target.message.focus()
})

// print the message to the page
function printMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<div class="py-3">
                        <p class="text-purple-800">
                        <b>${message.sentBy}</b> • <small class="text-purple-300">${message.time}</small>
                        </p>
                        <p class="text-purple-600">${message.message}</p>
                    </div>`
    document.querySelector('.all-messages').appendChild(div);
}

// Reset name text field
function resetNameField() {
    const nameField = document.getElementById('name')
    nameField.value = ""
}