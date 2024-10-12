import { Typography, Button } from '@mui/material';

const Instruction = ({ onNext }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Инструкция к тесту:
      </Typography>
      <Typography variant="body1" paragraph>
        Пожалуйста, внимательно читайте каждый вопрос и выбирайте ответы в соответствии с вашими
        предпочтениями. Сумма всех баллов должна быть равна 10.
      </Typography>
      <Button variant="contained" color="primary" onClick={onNext}>
        Начать тест
      </Button>
    </div>
  );
};

export default Instruction;
