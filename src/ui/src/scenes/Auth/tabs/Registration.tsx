import React from 'react';
import { Classes } from 'jss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import RegistrationIcon from '@material-ui/icons/KeyboardArrowRight';
import { Theme } from '@material-ui/core';

import useRegistrationForm from '../hooks/useRegistrationForm';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    paddingTop: theme.spacing.unit * 2,
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

const Registration: React.FC<Props> = ({ classes }) => {
  const {
    errors,
    username,
    email,
    password,
    isLoading,
    setUsername,
    setPassword,
    setEmail,
    submitForm,
    handleKeyDown,
  } = useRegistrationForm();

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
        value={ email }
        onChange={ setEmail }
        onKeyDown={ handleKeyDown }
        type="email"
        label="Email"
        margin="dense"
        variant="outlined"
        error={ !!errors.email }
        helperText={ errors.email }
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

      <Button
        onClick={ submitForm }
        variant="contained"
        color="primary"
        classes={ {
          root: classes.button,
          label: classes.buttonLabel
        } }
        size="large"
        disabled={ isLoading }
      >
        Register
        <RegistrationIcon />
      </Button>
    </div>
  );
}

export default withStyles(styles)(Registration);
