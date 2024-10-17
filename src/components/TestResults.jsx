import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const TestResults = ({ results }) => {
    if (!Array.isArray(results)) {
        return (
            <Container>
                <Typography variant="h4">Нет данных для отображения</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Результаты вашего теста Белбина
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
                {results.map(([role, score], index) => (
                    <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText primary={`${index + 1}. ${role}: ${score} баллов`} />
                    </ListItem>
                ))}
            </List>
            <Typography sx={{ width: '70%', margin: 'auto', marginTop: '30px', textAlign: 'center' }} variant="h4" gutterBottom>
                Спасибо, что прошли наш тест. Ваши результаты очень важны для нашего исследования!
            </Typography>
        </Container>
    );
};

export default TestResults;
