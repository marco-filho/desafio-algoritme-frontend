import React, { forwardRef, useState } from 'react';
import {
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Breadcrumbs,
  Button
} from '@mui/material';
import NumberFormat from 'react-number-format';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Link } from 'react-router-dom';
import db from '../firebase/database'

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
      mask="_"

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

function UpdateClient({ client }) {
  const [nome, setNome] = useState(client.nome);
  const [telefone, setTelefone] = useState(client.telefone);
  const [dataNascimento, setDataNascimento] = useState(new Date(client.data_nascimento));
  const [renda, setRenda] = useState(client.renda);
  const [status, setStatus] = useState(client.status);

  function submit() {
    const updateClient = {
      id: client.id,
      nome: nome,
      telefone: telefone,
      data_nascimento: dataNascimento.toDateString(),
      renda: renda,
      status: status,
    }

    db.update(updateClient)
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
        <Button
          variant="contained"
          color="success"
          onClick={submit}
          component={
            forwardRef((props, ref) => {
              return (
              <Link
                {...props}
                ref={ref}
                  to="/"
                >
                Atualizar
              </Link>
              )
            })
          }
        />
        <Button
          variant="outlined"
          color="error"
          component={
            forwardRef((props, ref) => {
              return (
              <Link
                {...props}
                ref={ref}
                  to="/"
                >
                Cancelar
              </Link>
              )
            })
          }
        />
      </Breadcrumbs>
    </Stack>
  )
}

export default UpdateClient