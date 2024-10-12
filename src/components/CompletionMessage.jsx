// src/components/CompletionMessage.jsx
import React from 'react';
import { Typography, Container } from '@mui/material';

const CompletionMessage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Спасибо, что прошли наш тест. Ваши результаты очень важны для нашего исследования!
      </Typography>
    </Container>
  );
};

export default CompletionMessage;
