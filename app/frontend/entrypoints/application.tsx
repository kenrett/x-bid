import React from 'react';
import { createRoot } from 'react-dom/client';

import Header from '../components/Header';

const rootElement = document.getElementById('react-app');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Header />
    </React.StrictMode>
  );
} else {
  console.error('Root element #react-app not found. Is your layout tag correct?');
}
