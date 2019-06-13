import React from 'react';
import { Classes } from 'jss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import LoginIcon from '@material-ui/icons/KeyboardArrowRight';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { Theme } from '@material-ui/core';

import useLoginForm from '../hooks/useLoginForm';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    paddingTop: theme.spacing.unit * 2,
  },
  description: {
    paddingTop: '15px',
    paddingBottom: '10px',
  },
  button: {
    marginTop: '10px',
  },
  buttonLabel: {
    paddingTop: '1px',
  },
});

type Props = {
  classes: Classes;
};

const Login: React.FC<Props> = ({ classes }) => {
  const {
    errors,
    username,
    password,
    remember,
    isLoading,
    setUsername,
    setPassword,
    setRemember,
    submitForm,
    handleKeyDown,
  } = useLoginForm();

  return (
    <div className={ classes.root }>
      <TextField
        value={ username }
        onChange={ setUsername }
        onKeyDown={ handleKeyDown }
        label="Username"
        margin="dense"
        variant="outlined"
        error={ !!errors.username }
        helperText={ errors.username }
      />

      <TextField
        value={ password }
        onChange={ setPassword }
        onKeyDown={ handleKeyDown }
        type="password"
        label="Password"
        margin="dense"
        variant="outlined"
        error={ !!errors.password }
        helperText={ errors.password }
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={ remember }
            onChange={ setRemember }
            color="primary"
          />
        }
        label="Remember me"
      />

      <Button
        onClick={ submitForm }
        variant="contained"
        color="primary"
        classes={ {
          root: classes.button,
          label: classes.buttonLabel,
        } }
        size="large"
        disabled={ isLoading }
      >
        Login
        <LoginIcon />
      </Button>
    </div>
  );
};

export default withStyles(styles)(Login);
