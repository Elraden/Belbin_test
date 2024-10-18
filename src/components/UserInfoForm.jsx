
import { TextField, Button, Typography, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import specialties from '../specialties.json'; 
const UserInfoForm = ({
  name,
  email,
  specialty, 
  teamName,
  inTeam,
  onNameChange,
  onEmailChange,
  onSpecialtyChange, 
  onTeamChange,
  onInTeamChange,
  nameError,
  emailError,
  specialtyError, 
  onNext,
}) => {
  return (
    <div>
      <Typography variant="h4">Введите информацию для начала теста</Typography>
      <TextField
        label="ФИО"
        fullWidth
        margin="normal"
        value={name}
        onChange={onNameChange}
        error={!!nameError}
        helperText={nameError}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={onEmailChange}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        select
        label="Специальность" 
        fullWidth
        margin="normal"
        value={specialty}
        onChange={onSpecialtyChange}
        error={!!specialtyError}
        helperText={specialtyError}
      >
        {specialties.map((spec, index) => (
          <MenuItem key={index} value={spec}>
            {spec}
          </MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={<Checkbox checked={inTeam} onChange={onInTeamChange} />}
        label="Состою в команде"
      />
      {inTeam && (
        <TextField
          label="Введите название команды"
          fullWidth
          margin="normal"
          value={teamName}
          onChange={onTeamChange}
        />
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        disabled={!!nameError || !!emailError || !name || !email || !!specialtyError || !specialty}
      >
        Начать тест
      </Button>
    </div>
  );
};

export default UserInfoForm;

