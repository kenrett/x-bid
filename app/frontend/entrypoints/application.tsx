import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer, Header, SignInForm } from "../components";

interface User {
  email_address: string;
  role: string;
}

interface CurrentUserResponse {
  user: User | null;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'auctions' | 'signIn'>('auctions');

  useEffect(() => {
    fetch("/current_user")
      .then((response) => response.json())
      .then((data: CurrentUserResponse) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  const handleSignIn = (signedInUser: User) => {
    setUser(signedInUser);
    setView("auctions");
  };

  return (
    <React.StrictMode>
      <Header user={user} onSignInClick={() => setView("signIn")} />
      {view === 'auctions' ? <AuctionContainer /> : <SignInForm onSignIn={handleSignIn} />}
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("react-app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error(
    "Root element #react-app not found. Is your layout tag correct?",
  );
}
