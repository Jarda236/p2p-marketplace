import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './components/app';


/**
 * Import styles
 */
//import './styles/normalize.css';
import './styles/index.css';
import { RecoilRoot } from 'recoil';

const client = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <RecoilRoot>
                <BrowserRouter>
                {
                    <App />
                }
                </BrowserRouter>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
);
