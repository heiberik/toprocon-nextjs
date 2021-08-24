import mongoose from 'mongoose'

const argumentSchema = mongoose.Schema({
    message: {
        type: String,
        min: 10,
        max: 1000,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    upvotes : {
        type: Number,
        default: 0
    },
    downvotes : {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Topic',
    },
    ratioUpvotesDownvotes: {
        type: Number
    },
    totalUpvotesDownvotes: {
        type: Number
    }, 
    totalPositiveNumber: {
        type: Number
    }, 
    active: {
        type: Boolean,
        default: true,
    }
},
    {
        timestamps: true,
    }
)

argumentSchema.pre('save', async function (next) {

    this.ratioUpvotesDownvotes = (this.upvotes || 1) / (this.downvotes || 1)
    this.totalUpvotesDownvotes = this.upvotes + this.downvotes
    this.totalPositiveNumber =  this.upvotes - this.downvotes
    next()
})


export default mongoose.models.Argument || mongoose.model('Argument', argumentSchema)