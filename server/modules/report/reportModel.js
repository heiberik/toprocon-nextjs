import mongoose from 'mongoose'

const reportSchema = mongoose.Schema({
    type: {
        type: String
    },
    reportedId: {
        type: String
    },
    description: {
        type: String
    }, 
    active: {
        type: Boolean,
        default: true,
    },
    moderator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sanctioned: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    agreed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    disagreed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        timestamps: true,
    }
)

reportSchema.pre('save', async function (next) {


})

export default mongoose.models.Report || mongoose.model('Report', reportSchema)