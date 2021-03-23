import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import ThemeProvider from './themes/ThemeProvider';
import StateProvider from './redux/StateProvider';
import ProtectedRoute from './helpers/components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <StateProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route exact path="/">
            <Redirect to="/signup" />
          </Route>
        </BrowserRouter>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
