import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        min: 1,
        max: 1000,
        required: true
    },
    room: {
        type: String
    },
    username : {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
    }
)

const Message = mongoose.model('Message', messageSchema)

export default Message