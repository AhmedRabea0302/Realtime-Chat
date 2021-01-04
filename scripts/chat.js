// Chatroom Class
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    };

    async addChat(message) {

        // Format a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
       
        // Save chat object to database
        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach( change => {
                    if(change.type == 'added') {
                        callback(change.doc.data());
                    }
                    console.log(change.doc.data());
                });
                
            });

    }

    updateName(username) {
        this.userusername = username;
        localStorage.setItem('username', username);
    }

    updteRoom(room) {
        this.room = room;
        console.log('Room Update');
        if(this.unsub) {
            this.unsub();
        }
    }
}

