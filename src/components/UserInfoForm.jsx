
import { TextField, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

const UserInfoForm = ({
  name,
  email,
  role,
  teamName,
  inTeam,
  onNameChange,
  onEmailChange,
  onRoleChange,
  onTeamChange,
  onInTeamChange,
  nameError,
  emailError,
  roleError,
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
        label="Ваша роль"
        fullWidth
        margin="normal"
        value={role}
        onChange={onRoleChange}
        error={!!roleError}
        helperText={roleError}
      />
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
        disabled={!!nameError || !!emailError || !name || !email || !!roleError || !role}
      >
        Начать тест
      </Button>
    </div>
  );
};

export default UserInfoForm;
