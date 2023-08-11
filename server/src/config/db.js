import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (conn) {
            console.log('Connected Database');
        }
    } catch (error) {
        console.log('Connect Fail!!!!!');
        process.exit(1);
    }
}