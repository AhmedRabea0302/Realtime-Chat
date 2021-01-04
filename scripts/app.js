// DOM QUIERIES
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');
const tabs = document.querySelector('.chat-rooms');

// Get name From LocalStorage
const username = localStorage.username ? localStorage.username : 'anonymous'; 

// Creat instances
const chatroom = new Chatroom('gaming', username);
const chatui = new Chatui(chatList);

//  Get Chat and Render
chatroom.getChats(data => chatui.render(data) );

// Add Message
newChat.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChat.message.value.trim();
    chatroom.addChat(message).
        then(() => {
            newChat.reset();
        }).
        catch( error => {
            console.log(error);
        })
});

// UpdateMessage
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    updateMessage.innerText = `Your New Name Is: ${newName}`;
    setTimeout(() => updateMessage.innerText = '', 3000);
});

// Change Rooms
tabs.addEventListener('click', e => {
    if(e.target.tagName == 'BUTTON') {
        chatui.clear(chatList);
        const room = e.target.getAttribute('id');
        console.log(room);
        chatroom.updteRoom(room);

        chatroom.getChats(chat => {
            chatui.render(chat);
        });
    }
});

const bunle = (...nums) => {
    return nums.map(num => num * 2);
}

console.log(bunle(1, 2, 4, 3, 8, 10));