import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer, Header } from "../components";

interface User {
  role: string;
}

interface CurrentUserResponse {
  user: User | null;
}

const rootElement = document.getElementById("react-app");

if (rootElement) {
  const root = createRoot(rootElement);

  function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      fetch("/current_user")
        .then((response) => response.json())
        .then((data: CurrentUserResponse) => setUser(data.user))
        .catch(() => setUser(null));
    }, []);

    return (
      <React.StrictMode>
        <Header isAdmin={user?.role === "admin"} />
        <AuctionContainer />
      </React.StrictMode>
    );
  }

  root.render(<App />);
} else {
  console.error(
    "Root element #react-app not found. Is your layout tag correct?",
  );
}
