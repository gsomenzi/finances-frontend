import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import AuthProvider from 'providers/AuthProvider';
import React from 'react';
import './App.css';
import Router from './Router';

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
    },
} as ThemeOptions);

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <Router />
                </ThemeProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
