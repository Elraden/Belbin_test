import BelbinForm from './components/BelbinForm';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        padding: '20px',
      }}
    >
      <BelbinForm />
    </Container>
  );
};

export default App;