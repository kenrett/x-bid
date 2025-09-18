import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { AuctionContainer, Header, SignInForm } from "@/components";
import type { User } from "@/components/types";

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
  const [user, setUser] = useState<User | undefined>(undefined); // undefined for loading state

  useEffect(() => {
    fetch("/api/v1/current_user")
      .then((response) => response.json())
      .then((data: CurrentUserResponse) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  // Render a loading state while checking for the current user
  if (user === undefined) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  const handleSignIn = (signedInUser: User) => {
    setUser(signedInUser);
  };

  const handleSignOut = () => {
    const signOut = async () => {
      const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')!.content;
      try {
        const response = await fetch('/api/v1/session', {
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
      <Header user={user} onSignInClick={() => setUser(null)} onSignOut={handleSignOut}/>
      {user ? (
        <AuctionContainer />
      ) : (
        <SignInForm onSignIn={handleSignIn} flash={window.appData?.flash} />
      )}
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
