import React from 'react';
import { ClientRoutes } from 'routes';
import Navigation from '../components/Navigation';

export function ClientLayout() {
  return (
    <div className="client">
      <Navigation />
      <div className="client_content">
        <ClientRoutes />
      </div>
    </div>
  );
}
