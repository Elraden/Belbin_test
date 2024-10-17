export const writeToDatabase = async (dbClient, data) => {
    const query = `
      INSERT INTO test_results (name, email, role, in_team, team_name, results, interpretation)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    
    const values = [
      data.name,
      data.email,
      data.role,
      data.inTeam,
      data.teamName || null,
      JSON.stringify(data.results),  
      JSON.stringify(data.interpretation) 
    ];
  
    return new Promise((resolve, reject) => {
      dbClient.query(query, values, (err, result) => {
        if (err) {
          console.error('Ошибка при записи в базу данных:', err);
          return reject(new Error('Ошибка при записи в базу данных'));
        }
        console.log("Данные успешно записаны в базу данных");
        resolve();
      });
    });
  };
  