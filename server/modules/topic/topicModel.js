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
    pros : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Argument'
    }],
    cons: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Argument'
    }],
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

    this.ratioProsCons = (this.pros.length || 1) / (this.cons.length || 1);
    this.totalProsCons = this.pros.length + this.cons.length;
    next()
})


export default mongoose.models.Topic || mongoose.model('Topic', topicSchema)