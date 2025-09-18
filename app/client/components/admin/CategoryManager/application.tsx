import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer } from "../components/features/Auction/AuctionContainer";
import { Header } from "../components/layouts/Header";
import { SignInForm } from "../components/ui/SignInForm/SignInForm";
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
    fetch("/api/v1/current_user")
      .then((response) => response.json())
      .then((data) => setUser(data.user as User | null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/api/v1/session/new") setView("signIn");
  }, [])

  const handleSignIn = (signedInUser: User) => {
    setUser(signedInUser);
    setView("auctions");
  };

  const handleSignOut = () => {
    const performSignOut = async () => {
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
      if (!csrfToken) {
        console.error("CSRF token not found");
        return;
      }
      const response = await fetch('/api/v1/session', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Accept': 'application/json',
        },
      });
      if (response.ok) window.location.href = '/';
    };
    void performSignOut();
  };

  return (
    <React.StrictMode>
      <Header onSignInClick={() => setView("signIn")} />
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
