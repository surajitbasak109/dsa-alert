import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'overmind-react';
import { config } from './store';
import { createOvermind } from 'overmind';

const overmind = createOvermind(config, {
  devtools: true
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider value={overmind}>
      <App />
    </Provider>
  </BrowserRouter>
);
