import fs from 'fs';

export const writeToJson = (data) => {
  let jsonData = [];
  if (fs.existsSync('data.json')) {
    const fileData = fs.readFileSync('data.json', 'utf8');
    if (fileData) {
      jsonData = JSON.parse(fileData);
    }
  }

  jsonData.push(data);

  fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
  console.log("Данные успешно записаны в JSON");
};
