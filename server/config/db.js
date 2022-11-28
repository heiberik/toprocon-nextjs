import mongoose from 'mongoose'

const connectDB = async () => {

    try {
        const connection = await mongoose.connect("mongodb://mongodb:27017/docker-db", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(`MongoDB Connected: ${connection.connection.host}`)

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB