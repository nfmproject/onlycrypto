import React from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface PwdState {
  password: string;
  showPassword: boolean;
}

interface State {
  values: PwdState;
  error: String;
  setValues: Function;
  label: String;
}

export function PasswordInput({ values, error, setValues, label }: State, ...props: any) {
  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth error={error.length > 0} variant="outlined">
      <InputLabel htmlFor="component-error">{label}</InputLabel>
      <OutlinedInput
        id="component-error"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="component-error-text"
        label="Password"
        error={error.length > 0}
      />
      <FormHelperText id="component-error-text">{error}</FormHelperText>
    </FormControl>
  );
}
