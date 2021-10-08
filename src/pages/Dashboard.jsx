import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Stack,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Collapse,
  Box
} from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Client from '../components/Client'
import db from '../firebase/database'

function Row({ client, setClient }) {
  const [open, setOpen] = useState(false);
  
  return (
    <>
    <TableRow>
      <TableCell align="center">{client.id}</TableCell>
      <TableCell align="left">{client.nome}</TableCell>
      <TableCell align="center">
        <Checkbox checked={client.status} disabled />
      </TableCell>
      <TableCell align="right">
        <IconButton size="large" onClick={() => setOpen(!open)}>
          {open ?
            <KeyboardArrowUpIcon color="primary" /> :
            <KeyboardArrowDownIcon color="info" />
          }
        </IconButton>
        <IconButton size="large" onClick={() => db.delete(client.id)}>
          <DeleteRoundedIcon color="error" />
        </IconButton>
        <Link to="/UpdateClient" onClick={() => setClient(client)}>
          <IconButton size="large">
            <EditRoundedIcon color="success" />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <Client client={client} />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>
  )
}

function Dashboard({ setClient }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    db.refreshOn(setClients)
  }, []);

  return (
    <Stack
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
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
        Painel de controle
      </Typography>
      <TableContainer style={{ width: "70%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ width: "10%" }}>Id</TableCell>
                <TableCell align="left" style={{ width: "55%" }}>Cliente</TableCell>
                <TableCell align="center" style={{ width: "10%" }}>Status</TableCell>
                <TableCell align="right" style={{ width: "25%" }}>
                  <Link to="/NewClient">
                    <IconButton
                      size="large"
                    >
                      <AddCircleRoundedIcon color="secondary" />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                clients.length === 0 ? <TableCell colSpan="4" align="center">Nenhum registro encontrado.</TableCell> : 
                clients.map((client) => <Row client={client} setClient={setClient} />)
              }
            </TableBody>
          </Table>
      </TableContainer>
    </Stack>
  );
}

export default Dashboard