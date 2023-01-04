import React, { useState, useEffect } from 'react';
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import '@elastic/eui/dist/eui_theme_dark.css';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import CreateMeeting from './pages/CreateMeeting';
import OneonOneMeeting from './pages/OneonOneMeeting';
function App() {
  // const isDarkTheme = useSelector((state: any) => state.auth.isDarkTheme());

  // const [theme, setTheme] = useState<EuiThemeColorMode>('light');
  // const [isInitialTheme, setIsInitialTheme] = useState(false);
  // useEffect(() => {
  //   const theme = localStorage.getItem('zoom-theme');
  //   if (theme) {
  //     setTheme(theme as EuiThemeColorMode);
  //   } else {
  //     localStorage.setItem('zoom-theme', 'light');
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isInitialTheme) setIsInitialTheme(false);
  //   else {
  //     window.location.reload();
  //   }
  // }, [isDarkTheme]);
  const overrides = {
    colors: {
      LIGHT: { primary: '#0b5cff' },
      DARK: { primary: '#0b5cff' },
    },
  };
  return (
    <div className="App">
      <EuiProvider>
        <EuiThemeProvider modify={overrides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneonOneMeeting />} />
          </Routes>
        </EuiThemeProvider>
      </EuiProvider>
    </div>
  );
}

export default App;
