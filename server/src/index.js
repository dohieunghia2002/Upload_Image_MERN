import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.route.js';
import adminRouter from './routes/admin.route.js';
import imageRouter from './routes/image.route.js';


dotenv.config();

const app = express();

app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.options(
    '*',
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.static('public'));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/image', imageRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})