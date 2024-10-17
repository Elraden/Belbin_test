import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDatabase from './db.js';
import { writeToCsv } from './csvWriter.js';
import { writeToJson } from './jsonWriter.js';
import { writeToDatabase } from './dbWriter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbClient = connectToDatabase();

const app = express();

console.log("Сервер запускается...");

if (dbClient) {
  console.log("Подключение к базе данных успешно");
} else {
  console.log("Не удалось подключиться к базе данных");
}

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} запрос на ${req.url}`);
  next();
});

app.post('/api/save', async (req, res) => {
  const data = req.body;
  // console.log("POST запрос на /api/save", data);

  try {
    
    console.log("Попытка записи в JSON...");
    writeToJson(data);

    // console.log("Попытка записи в CSV...");
    // await writeToCsv(data);

    console.log("Попытка записи в базу данных...");
    await writeToDatabase(dbClient, data);

    res.json({ message: 'Данные успешно сохранены' });
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  console.log("GET запрос на *");
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
