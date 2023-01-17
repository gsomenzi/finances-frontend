import React from 'react';
import Router from './Router';
import AuthProvider from 'providers/AuthProvider';
import { createTheme, Paper, ThemeOptions, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

const queryClient = new QueryClient();

const theme = createTheme({
    components: {
        MuiLink: {
            defaultProps: {
                underline: 'none',
            },
        },
        MuiTableContainer: {
            defaultProps: {
                component: Paper,
                elevation: 1,
            },
        },
    },
} as ThemeOptions);

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        <Router />
                    </ThemeProvider>
                </AuthProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
