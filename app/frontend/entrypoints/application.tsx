import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer, Header, SignInForm } from "../components";
import type { User } from "../types";

interface CurrentUserResponse {
  user: User | null;
}

interface AppProps {
  flash?: {
    alert?: string;
    notice?: string;
  };
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

  useEffect(() => {
    if (window.location.pathname === "/session/new") setView("signIn");
  }, [])

  const handleSignIn = (signedInUser: User) => {
    setUser(signedInUser);
    setView("auctions");
  };

  const handleSignOut = () => {
    const signOut = async () => {
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')!.content;
      try {
        const response = await fetch('/session', {
          method: 'DELETE',
          headers: {
            'X-CSRF-Token': csrfToken,
            'Accept': 'application/json',
          },
        });
        if (response.ok) {
          setUser(null);
        }
      } catch (error) {
        console.error("Sign out failed:", error);
      }
    };
    void signOut();
  };

  return (
    <React.StrictMode>
      <Header user={user} onSignInClick={() => setView("signIn")} onSignOut={handleSignOut}/>
      {view === 'auctions' ? <AuctionContainer/> : <SignInForm onSignIn={handleSignIn} flash={window.appData?.flash} />}
    </React.StrictMode>
  );
}

declare global {
  interface Window {
    appData?: AppProps;
  }
}

const rootElement = document.getElementById("react-app");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App/>);
} else {
  console.error(
    "Root element #react-app not found. Is your layout tag correct?",
  );
}
