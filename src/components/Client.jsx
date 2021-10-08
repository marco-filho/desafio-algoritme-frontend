import React from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

function Client({ client }) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component="th" style={_cell}>Id</TableCell>
            <TableCell>{client.id}</TableCell>
            <TableCell component="th" style={_cell}>Nome</TableCell>
            <TableCell>{client.nome}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" style={_cell}>Renda</TableCell>
            <TableCell>
              {"R$" + client.renda.replace(".", ",")}
            </TableCell>
            <TableCell component="th" style={_cell}>Telefone</TableCell>
            <TableCell>{client.telefone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" style={_cell}>Data de nascimento</TableCell>
            <TableCell>{new Date(client.data_nascimento).toLocaleDateString()}</TableCell>
            <TableCell component="th" style={_cell}>Status</TableCell>
            <TableCell>{client.status ? "Ativo" : "Inativo"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const _cell = {
  width: "20%",
  fontWeight: "bold"
}

export default Client