import { TextField, Button, Typography, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useState } from 'react';
import { validateEmail, validateName, validateRole } from '../utils/validators';
import roles from '../roles.json';

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
  onNext,
}) => {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');

  const handleValidation = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const roleErr = validateRole(role);

    setNameError(nameErr);
    setEmailError(emailErr);
    setRoleError(roleErr);

    return !nameErr && !emailErr && !roleErr;
  };

  const handleNext = () => {
    if (handleValidation()) {
      onNext();
    }
  };

  return (
    <div style={{ width: "100%" }}>
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
        onChange={(e) => {
          onEmailChange(e.target.value);
          setEmailError(validateEmail(e.target.value));
        }}
        error={!!emailError}
        helperText={emailError}
      />

      <FormControl fullWidth margin="normal" style={{ width: '100%' }} error={!!roleError}>
        <InputLabel>Специальность</InputLabel>
        <Select
          value={role || ''}
          onChange={(e) => {
            onRoleChange(e.target.value);
            setRoleError(validateRole(e.target.value));
          }}
        >
          {roles.map((roleOption, index) => (
            <MenuItem key={index} value={roleOption}>
              {roleOption}
            </MenuItem>
          ))}
        </Select>
        {roleError && <Typography color="error">{roleError}</Typography>}
      </FormControl>

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
        onClick={handleNext}
        disabled={!name || !email || !role || !!nameError || !!emailError || !!roleError}
      >
        Начать тест
      </Button>
    </div>
  );
};

export default UserInfoForm;
