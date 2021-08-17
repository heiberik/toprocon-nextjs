import mongoose from 'mongoose'
import Argument from '../argument/argumentModel.js'

const topicSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 1000,
        required: true
    },
    description: {
        type: String
    },
    resources: [],
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    arguments: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Argument'
    }],
    numPros: {
        type: Number
    },
    numCons: {
        type: Number
    },
    ratioProsCons: {
        type: Number
    },
    totalProsCons: {
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

topicSchema.pre('save', async function (next) {

    this.ratioProsCons = (this.numPros || 1) / (this.numCons || 1)
    this.totalProsCons = this.numPros + this.numCons

    next()
})


export default mongoose.models.Topic || mongoose.model('Topic', topicSchema)