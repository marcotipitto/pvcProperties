import React, { useEffect } from 'react';
import Header from './components/shared/Header';
import Routes from './Routes';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from 'providers/AuthProvider';
import { MapProvider } from 'providers/MapProvider';
import { initStore } from './store';

import { ToastContainer } from 'react-toastify';

const store = initStore();

const Providers = ({ children }) => 
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey="MtnWY1nmXS4nDGIloglQ36imiTlxQJdw">
        {children}
      </MapProvider>
    </AuthProvider>
  </Provider>

const PvcApp = () => {
  const authService = useAuth();

  useEffect(() => {
    authService.checkAuthState();
  }, [authService]);

  return (
    <Router>
      <Header signOut={authService.signOut}/>
      <Routes />
    </Router>
  )
}

const App = () => {
  return (
    <Providers>
      <ToastContainer />
      <PvcApp />
    </Providers>
  );
}

export default App;
