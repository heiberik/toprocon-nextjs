import Message from './messageModel.js'

class MessageService {

    addMessage = async (text, user) => {
        try {
            return await Message.create({ 
                message: text, 
                user: user.id, 
                username: user.username 
            })
        }
        catch(error){
            throw new Error('Error making message');
        }
    }

    getMessages = async () => {
        try {
            return await (await Message.find().sort({ _id: -1 }).limit(50)).reverse()
        }
        catch(error){
            throw new Error('Error finding messages');
        }
    }
}

export default new MessageService