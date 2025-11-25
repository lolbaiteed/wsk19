import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true } ));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api', authRoute);
app.use('/admin', adminRoute);

app.get('/', (_req, res) => {
  res.render('index');
});

app.get('{/*path}', (req, res) => {
  res.status(404).render('notFound');
})

export default app;
