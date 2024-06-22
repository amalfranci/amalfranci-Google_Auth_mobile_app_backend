import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import dbCon from './utlies/DbConfig.js';
import router from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

app.use(cors());
app.use(bodyParser.json());

dbCon();

app.use('/user', router);

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});
