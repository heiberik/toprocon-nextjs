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
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: 86400000 } 
    }
},
    {
        timestamps: true,
    }
)

tokenSchema.methods.isValid = function () {

    const expireTime = new Date(this.expireAt);
    const currentTime = new Date();
    if (currentTime < expireTime) {
        return false
    }
    return true
}


export default mongoose.models.Token || mongoose.model('Token', tokenSchema)