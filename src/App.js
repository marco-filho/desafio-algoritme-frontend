import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import PageNotFound from './pages/PageNotFound';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import NewClient from './pages/NewClient';
import UpdateClient from './pages/UpdateClient';

import { getAuth } from 'firebase/auth';
import { LogoutRounded, DashboardRounded } from '@mui/icons-material';
// import { Breadcrumbs, Divider, Container } from '@material-ui/core';
import { Breadcrumbs, Divider, Container, IconButton, Typography } from '@mui/material';

function App() {
  const [user, setUser] = useState();
  const [client, setClient] = useState();

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(setUser);
    return subscriber;
  }, []);

  if (!user)
    return (
      <main>
        <Authentication />
      </main>
    )
  
  return (  
    <Router>
      <header>
        <Container>
            <Route path="/">
              <Breadcrumbs separator="" style={{ display: "flex", justifyContent: "center"}}>
                <Typography
                    variant="p"
                    color="primary"
                    align="center"
                  >
                    Olá, {user.email}!
                </Typography>
                <Link to="/">
                  <IconButton>
                    <DashboardRounded color="primary" fontSize="large" />
                  </IconButton>
                </Link>
                <Link onClick={() => getAuth().signOut()} to="/">
                  <IconButton>
                    <LogoutRounded color="primary" fontSize="large" />
                  </IconButton>
                </Link>
              </Breadcrumbs>
            </Route>
          <Divider />
        </Container>
      </header>
      <main>
        <Container style={{ display: "flex", justifyContent: "center" }}>
            <Switch>
              <Route exact path="/">
                <Dashboard setClient={setClient}/>
              </Route>
              <Route exact path="/NewClient">
                <NewClient />
              </Route>
              <Route exact path="/UpdateClient">
                <UpdateClient client={client}/>
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
        </Container>
      </main>
    </Router>
  )
}

export default App;
