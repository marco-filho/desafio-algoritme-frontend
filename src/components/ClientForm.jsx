import React, { forwardRef, useState } from 'react';

import {
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Breadcrumbs
} from '@mui/material';
import NumberFormat from 'react-number-format';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import db from '../firebase/database'
import clientValidations from '../pages/validations/clientValidations'
import NomeValidationError from '../pages/validations/errors/NomeValidationError';
import TelefoneValidationError from '../pages/validations/errors/TelefoneValidationError';
import FormButton from './FormButton';

const RendaFormat = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      prefix="R$"
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      isNumericString
      isAllowed={({ floatValue }) => floatValue <= 9999999 }

      getInputRef={ref}
      onValueChange={(vals) => {
          onChange({
            target: {
              name: props.name,
              value: vals.value
            }
          })
      }}
    />
  );
});

const TelefoneFormat = forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      format="(##) #####-####"

      getInputRef={ref}
      onValueChange={(vals) => {
          onChange({
            target: {
              name: props.name,
              value: vals.value
            }
          })
      }}
    />
  );
});

function ClientForm({ client }) {
  const [_nome, _telefone, _dataNascimento, _renda, _status] =
    client ?
        [client.nome, client.telefone, new Date(client.data_nascimento), client.renda, client.status] :
        ["", "", new Date(0), "0", false]
  
  const [nome, setNome] = useState(_nome);
  const [telefone, setTelefone] = useState(_telefone);
  const [dataNascimento, setDataNascimento] = useState(_dataNascimento);
  const [renda, setRenda] = useState(_renda);
  const [status, setStatus] = useState(_status);

  const [nomeValidation, setNomeValidation] = useState();
  const [telefoneValidation, setTelefoneValidation] = useState();

  function submit() {
    const clientPost = {
      id: client ? client.id : null,
      nome: nome,
      telefone: telefone,
      data_nascimento: dataNascimento.toDateString(),
      renda: renda,
      status: status,
    }

    try {
      setNomeValidation()
      setTelefoneValidation()
      clientValidations(clientPost)
      client ? db.update(clientPost) : db.create(clientPost)
      return true
    } catch (e) {
      if (e instanceof NomeValidationError)
        setNomeValidation(e.message)
      else if (e instanceof TelefoneValidationError)
        setTelefoneValidation(e.message)
      return false
    }
  }

  return (
    <Stack
      component="form"
      noValidate
      spacing={3}
      margin="1em"
    >
      <Typography
        variant="h4"
        color="primary"
        align="center"
        style={{
          marginTop: "15px",
          fontWeight: "bold"
        }}
      >
        Atualizar Cliente
      </Typography>
      <TextField
        id="nome"
        name="nome"
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(e) => { setNome(e.target.value) }}

        error={nomeValidation ? true : false}
        helperText={nomeValidation}
      />
      <TextField
        id="telefone"
        name="telefone"
        label="Telefone"
        variant="outlined"
        value={telefone}
        onChange={(e) => { setTelefone(e.target.value) }}
        InputProps={{
          inputComponent: TelefoneFormat
        }}
        
        error={telefoneValidation ? true : false}
        helperText={telefoneValidation}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          id="data_nascimento"
          name="data_nascimento"
          label="Data de nascimento"

          inputFormat="dd/MM/yyyy"
          views={["year", "month", "day"]}
          openTo="day"
          minDate={new Date('1900-01-01')}
          disableFuture={true}

          value={dataNascimento}
          onChange={(val) => { setDataNascimento(val); } }
          renderInput={(params) => <TextField {...params} />} />
      </LocalizationProvider>
      <TextField
        id="renda"
        name="renda"
        label="Renda"
        variant="outlined"
        value={renda}
        onChange={(e) => { setRenda(e.target.value) }}
        InputProps={{
          inputComponent: RendaFormat
        }}
      />
      <FormControlLabel
        label="Status"
        control={
          <Checkbox
            id="status"
            name="status"
            checked={status}
            onClick={(e) => { setStatus(e.target.checked) }} />
        }
      />
      <Breadcrumbs separator="">
        <FormButton submit={submit} formPath={window.location.pathname} />
        <FormButton />
      </Breadcrumbs>
    </Stack>
  )
}

export default ClientForm