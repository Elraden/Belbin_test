import fs from 'fs';

export const writeToCsv = async (data) => {
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
    console.log(answers);
    csvLine.push(answers);
  
  });


  return new Promise((resolve, reject) => {
    fs.appendFile('data.csv', csvLine.join(',') + '\n', (err) => {
      if (err) {
        console.error('Ошибка при записи в CSV:', err);
        return reject(new Error('Ошибка при записи в CSV'));
      }
      console.log("Данные успешно записаны в CSV");
      resolve();
    });
  });
};
