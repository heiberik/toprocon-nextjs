import { Server } from "socket.io"
import { protectSocket } from "../middleware/authMiddleware.js"
import User from "../modules/user/userModel.js"
import MessageService from "../modules/message/messageService.js"


const socketIO = (server) => {

    const io = new Server(server);

    io.use(protectSocket)

    io.on('connection', async (socket) => {

        const user = await User.findById(socket.decoded.id)
        console.log('user connected');

        socket.on('chat_message', async (message) => {
            io.emit('chat_message', await MessageService.addMessage(message, user));
        });
    
        socket.emit('chat_messages', await MessageService.getMessages());

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

export default socketIO