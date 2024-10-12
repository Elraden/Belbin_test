import { Typography, Slider } from '@mui/material';

const QuestionSection = ({ sectionData, answers, onAnswerChange }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {sectionData.generalQuestion}
      </Typography>
      {sectionData.statements.map((statement, index) => (
        <div key={index}>
          <Typography variant="body1">{statement}</Typography>
          <Slider
            value={answers[index] || 0}
            onChange={(e, value) => onAnswerChange(index, value)}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="auto"
            marks
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionSection;
