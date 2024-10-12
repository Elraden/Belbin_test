import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDatabase from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbClient = connectToDatabase();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', async (req, res) => {
  const data = req.body;

  try {
    // Работа с файлами
    let jsonData = [];
    if (fs.existsSync('data.json')) {
      const fileData = fs.readFileSync('data.json', 'utf8');
      if (fileData) {
        jsonData = JSON.parse(fileData);
      }
    }

    jsonData.push(data);
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

    const sections = Object.keys(data).filter(
      (key) =>
        typeof data[key] === 'object' &&
        key !== 'name' &&
        key !== 'email' &&
        key !== 'role' &&
        key !== 'inTeam' &&
        key !== 'teamName'
    );

    const csvLine = [
      data.name,
      data.email,
      data.role,
      data.inTeam ? data.teamName : ''
    ];

    sections.forEach((section) => {
      const answers = Object.values(data[section]);
      csvLine.push(...answers.map((value) => (value !== undefined ? value : 0)));
    });

    // Запись в CSV
    await new Promise((resolve, reject) => {
      fs.appendFile('data.csv', csvLine.join(',') + '\n', (err) => {
        if (err) {
          console.error('Ошибка при записи в CSV:', err);
          return reject(new Error('Ошибка при записи в CSV'));
        }
        resolve();
      });
    });

    // Работа с базой данных
    if (dbClient) {
      const query = `
        INSERT INTO test_results (name, email, role, in_team, team_name, results)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      const values = [
        data.name,
        data.email,
        data.role,
        data.inTeam,
        data.teamName || null,
        JSON.stringify(data)
      ];

      await new Promise((resolve, reject) => {
        dbClient.query(query, values, (err, result) => {
          if (err) {
            console.error('Ошибка при записи в базу данных:', err);
            return reject(new Error('Ошибка при записи в базу данных'));
          }
          resolve();
        });
      });
    }

    // Только один раз отправляем ответ
    res.json({ message: 'Данные успешно сохранены' });

  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
