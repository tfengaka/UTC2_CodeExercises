import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from 'hooks/useAuth';
import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { PrivateRoute } from 'routes';
import { AdminLayout, ClientLayout } from './layout';
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Switch>
          <Route path="/*" element={<ClientLayout />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminLayout />} />
          </Route>
        </Switch>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
