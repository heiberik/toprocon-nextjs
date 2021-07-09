import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 20,
        required: true,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        min: 6,
        max: 255,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isMod: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Argument'
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Argument'
    }],
    pointsTotal: {
        type: Number,
        default: 0
    },
    modPoints: {
        type: Number,
        default: 0
    },
    topicPoints: {
        type: Number,
        default: 0
    },
    argumentPoints: {
        type: Number,
        default: 0
    },
    totalWarnings: {
        type: Number,
        default: 0
    },
},
    {
        timestamps: true,
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


export default mongoose.models.User || mongoose.model('User', userSchema)