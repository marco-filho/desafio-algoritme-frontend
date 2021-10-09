import React, { useState } from 'react';
import {
  Popper,
  Fade,
  Paper,
  Typography,
  Stack,
  IconButton
} from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function DeletePopper(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  };

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }} align="center">Você tem certeza?</Typography>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <IconButton
                  color="success"
                  onClick={() => props.deleteFunc(props.clientId)} >
                  <CheckCircleRoundedIcon color="success" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => setOpen(!open)} >
                  <CancelRoundedIcon color="error" />
                </IconButton>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
      <IconButton size="large" onClick={handleClick}>
        {props.children}
      </IconButton>
    </>
  )
}

export default DeletePopper