import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    token: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        expires: '1h', 
        default: Date.now 
    }
},
    {
        timestamps: true,
    }
)


export default mongoose.models.Token || mongoose.model('Token', tokenSchema)