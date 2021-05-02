const users = []

// join user to chat

function userJoined(id, name) {
    const user = {
        id,
        name
    }
    users.push(user)
    return user
}

function getUser (id) {
    return users.find(user => user.id === id)
}

module.exports = {
    userJoined,
    getUser
}