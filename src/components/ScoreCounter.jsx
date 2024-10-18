import { Typography } from '@mui/material';

const ScoreCounter = ({ totalPoints }) => {
  return (
    <Typography variant="h6" sx={{ marginTop: '20px' }}>
      Сумма баллов: {totalPoints}/10
    </Typography>
  );
};

export default ScoreCounter;
