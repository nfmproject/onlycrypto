import React from 'react';
import TextField from '@mui/material/TextField';

interface State {
  value: String;
  error?: String;
  setValue: Function;
  label: String;
}

function FormInput({ value, setValue, label, error }: State, ...props: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      error={error ? error.length > 0 : false}
      id='outlined-error-helper-text'
      label={label ?? 'Value'}
      value={value}
      onChange={handleChange}
      helperText={error}
      fullWidth
    />
  );
}

export default FormInput;
