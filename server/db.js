import pg from 'pg';
const { Client } = pg;

const connectToDatabase = () => {
  if (!process.env.DATABASE_URL) {
    console.log('Переменная окружения DATABASE_URL не найдена. Подключение к базе данных отключено.');
    return null;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect((err) => {
    if (err) {
      console.error('Ошибка подключения к базе данных:', err);
    } else {
      console.log('Успешное подключение к базе данных');
    }
  });

  return client;
};

export default connectToDatabase;
