import React from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer, Header } from "../components";

const rootElement = document.getElementById("react-app");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Header />
      <AuctionContainer />
    </React.StrictMode>,
  );
} else {
  console.error(
    "Root element #react-app not found. Is your layout tag correct?",
  );
}
