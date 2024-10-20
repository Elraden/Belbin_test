import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import roleDescriptions from '../roleDescriptions.json';

const TestResults = ({ results }) => {
    return (
        <Container sx={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Результаты вашего теста Белбина
            </Typography>
            {results.map(([role, score], index) => {
                const roleInfo = roleDescriptions.find((r) => r.role === role);
                return (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{`${role}: ${score} баллов`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
                                {roleInfo?.description?.replace('Плюсы:', '\n\nПлюсы:').replace('Минусы:', '\n\nМинусы:') || 'Описание отсутствует'}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            <Typography sx={{ width: '70%', margin: 'auto', marginTop: '30px', textAlign: 'center' }} variant="h4" gutterBottom>
                Спасибо, что прошли наш тест. Ваши результаты очень важны для нашего исследования!
            </Typography>
        </Container>
    );
};

export default TestResults;

