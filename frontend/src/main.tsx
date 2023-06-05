import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './components/app';


/**
 * Import styles
 */
import './styles/normalize.css';

const client = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <BrowserRouter>
            {
                <App />
            }
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);
