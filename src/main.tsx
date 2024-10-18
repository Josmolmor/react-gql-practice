import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import './index.css';
import { StrictMode } from 'react';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
  headers: {},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
