import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', (req, res) => {
  const data = req.body;

  try {
    let jsonData = [];
    if (fs.existsSync('data.json')) {
      const fileData = fs.readFileSync('data.json', 'utf8');
      if (fileData) {
        jsonData = JSON.parse(fileData); 
      }
    }

    jsonData.push(data);

    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));

    const sections = Object.keys(data).filter((key) => typeof data[key] === 'object' && key !== 'name' && key !== 'email' && key !== 'role' && key !== 'inTeam' && key !== 'teamName');
    
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

    fs.appendFile('data.csv', csvLine.join(',') + '\n', (err) => {
      if (err) {
        console.error('Ошибка при записи в CSV:', err);
        res.status(500).json({ message: 'Ошибка при записи в CSV' });
      } else {
        res.json({ message: 'Данные успешно сохранены' });
      }
    });

  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

app.listen(5000, () => {
  console.log('Сервер запущен на порту 5000');
});
