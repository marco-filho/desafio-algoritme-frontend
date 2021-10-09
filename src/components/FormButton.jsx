import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

function FormButton({ submit, formPath }) {
  const history = useHistory();

  const [variant, color, text] =
    submit ?
      ["contained", "success", "Confirmar"] :
      ["outlined", "error", "Cancelar"]

  function handleClick() {
    if ((submit && submit()) || !submit)
      history.push("/")
    else
      history.push(formPath)
  }

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}

export default FormButton