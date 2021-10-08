import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Typography,
  Breadcrumbs,
  Button,
} from "@material-ui/core";
import auth from '../firebase/auth'

function Authentication() {
  const l = "Login", r = "Registrar";
  const [action, setAction] = useState(l);
  const [alternate, setAlternate] = useState(r);

  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [validationError, setValidationError] = useState();

  function ConfirmPasswordComponent() {
    return (
      <TextField
        //value={passwordConf}
        onChange={(e) => setPasswordConf(e.target.value)}
        id="passwordConf"
        name="passwordConf"
        label="Confirmar senha"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        />
    );
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
    setPasswordConf("");
    setValidationError();

    if (action === "Registrar")
      setConfirmPassword(<ConfirmPasswordComponent />);
    else
      setConfirmPassword();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  function submit() {
    if (action === "Login")
        auth.signIn(email, password);

    if (action === "Registrar") {
      if (!passwordConf || password !== passwordConf) {
        setValidationError(
          <Typography variant="overline" color="error">As senhas não coincidem!</Typography>
        );
        return;
      }
      setValidationError();
      auth.register(email, password);
    }
  }

  return (
    <Container id="auth-form" component="form" maxWidth="sm">
      <Typography
        variant="h3"
        color="primary"
        align="center"
        style={{
          margin: "20px",
          fontWeight: "bold"
        }}
      >
        {action}
      </Typography>
      
      <div style={{ marginBottom: "10px"}}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          label="Senha"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        {confirmPassword}
        {validationError}
      </div>
      
      <Breadcrumbs separator="">
        <Button
          onClick={() => {
            submit();
          }}
          variant="contained"
          color="primary">
          {action}
        </Button>
        <Button 
          onClick={() => {
            setAction(alternate);
            setAlternate(action);
          }}
          variant="outlined"
          color="primary">
          {alternate}
        </Button>
      </Breadcrumbs>
    </Container>
  );
}

export default Authentication